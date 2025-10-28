import { test, expect } from '@playwright/test';

/**
 * 로그인 폼 테스트
 * 
 * 테스트 조건:
 * - 실제 데이터 사용 (성공 시나리오는 Mock 사용 금지)
 * - Mock 데이터 사용 (실패 시나리오만)
 * - data-testid를 사용한 요소 식별
 * - timeout: network 통신 2000ms 이하, 그 외 500ms 이하
 */

test.describe('로그인 폼 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto('/auth/login');
    
    // 페이지 로드 대기 (고정식별자 사용)
    await page.waitForSelector('[data-testid="auth-login-form"]', { timeout: 2000 });
  });

  test('모든 입력이 완료되면 로그인 버튼이 활성화되어야 한다', async ({ page }) => {
    // 로그인 버튼 초기 상태 확인 (비활성화)
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
    await expect(submitButton).toBeDisabled();

    // 이메일 입력
    await page.locator('[data-testid="auth-login-email-input"]').fill('a@c.com');
    await expect(submitButton).toBeDisabled();

    // 비밀번호 입력
    await page.locator('[data-testid="auth-login-password-input"]').fill('1234qwer');
    
    // 모든 입력 완료 후 버튼 활성화 확인
    await expect(submitButton).toBeEnabled();
  });

  test('이메일 검증: @ 미포함 시 에러 메시지 표시', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    
    // @ 없는 이메일 입력
    await emailInput.fill('invalidemail');
    await emailInput.blur();
    
    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-login-email-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 500 });
  });

  test('비밀번호 검증: 1글자 미만 시 에러 메시지 표시', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    
    // 먼저 값을 입력한 후 삭제 (react-hook-form이 필드를 터치된 것으로 인식)
    await passwordInput.fill('1');
    await passwordInput.fill('');
    await passwordInput.blur();
    
    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-login-password-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 500 });
  });

  test('로그인 성공 시 loginUser API에서 accessToken이 정상적으로 반환되어야 한다', async ({ page }) => {
    // 실제 API 사용 (모킹하지 않음)
    // 폼 입력
    await page.locator('[data-testid="auth-login-email-input"]').fill('a@c.com');
    await page.locator('[data-testid="auth-login-password-input"]').fill('1234qwer');

    // API 응답 캡처를 위한 Promise 설정
    const responsePromise = page.waitForResponse(
      response => response.url().includes('/graphql') && response.status() === 200,
      { timeout: 2000 }
    );

    // 로그인 버튼 클릭
    await page.locator('[data-testid="auth-login-submit-button"]').click();

    // API 응답 대기 및 확인
    const response = await responsePromise;
    const responseBody = await response.json();

    // accessToken이 응답에 포함되어 있는지 확인
    expect(responseBody.data.loginUser.accessToken).toBeDefined();
    expect(responseBody.data.loginUser.accessToken).toBeTruthy();
  });

  test('로그인 성공 시 fetchUserLoggedIn API에서 _id와 name이 정상적으로 반환되어야 한다', async ({ page }) => {
    // 실제 API 사용 (모킹하지 않음)
    // 폼 입력
    await page.locator('[data-testid="auth-login-email-input"]').fill('a@c.com');
    await page.locator('[data-testid="auth-login-password-input"]').fill('1234qwer');

    // fetchUserLoggedIn API 응답을 캡처하기 위한 Promise 설정
    const userResponsePromise = page.waitForResponse(
      async (response) => {
        if (!response.url().includes('/graphql') || response.status() !== 200) {
          return false;
        }
        const body = await response.json();
        return body.data?.fetchUserLoggedIn !== undefined;
      },
      { timeout: 2000 }
    );

    // 로그인 버튼 클릭
    await page.locator('[data-testid="auth-login-submit-button"]').click();

    // fetchUserLoggedIn API 응답 대기 및 확인
    const userResponse = await userResponsePromise;
    const userResponseBody = await userResponse.json();

    // _id와 name이 응답에 포함되어 있는지 확인
    expect(userResponseBody.data.fetchUserLoggedIn._id).toBeDefined();
    expect(userResponseBody.data.fetchUserLoggedIn._id).toBeTruthy();
    expect(userResponseBody.data.fetchUserLoggedIn.name).toBeDefined();
    expect(userResponseBody.data.fetchUserLoggedIn.name).toBeTruthy();
  });

  test('로그인 성공 시 로그인완료 모달이 표시되고 일기목록 페이지로 이동해야 한다', async ({ page }) => {
    // 실제 API 사용 (모킹하지 않음)
    // 폼 입력
    await page.locator('[data-testid="auth-login-email-input"]').fill('a@c.com');
    await page.locator('[data-testid="auth-login-password-input"]').fill('1234qwer');

    // 로그인 버튼 클릭
    await page.locator('[data-testid="auth-login-submit-button"]').click();

    // 로그인완료 모달 표시 확인 (network 통신 시간 고려)
    const successModal = page.locator('[data-testid="auth-login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });

    // 모달 제목 확인
    await expect(successModal.locator('[data-testid="modal-title"]')).toContainText('로그인 완료');

    // 확인 버튼 클릭
    await page.locator('[data-testid="modal-primary-button"]').click();

    // 일기목록 페이지로 이동 확인
    await expect(page).toHaveURL('/diaries', { timeout: 2000 });
  });

  test('로그인 성공 시 localStorage에 accessToken과 user 정보가 저장되어야 한다', async ({ page }) => {
    // 실제 API 사용 (모킹하지 않음)
    // 폼 입력
    await page.locator('[data-testid="auth-login-email-input"]').fill('a@c.com');
    await page.locator('[data-testid="auth-login-password-input"]').fill('1234qwer');

    // 로그인 버튼 클릭
    await page.locator('[data-testid="auth-login-submit-button"]').click();

    // 로그인완료 모달 표시 확인
    const successModal = page.locator('[data-testid="auth-login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });

    // localStorage 확인
    const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
    const userStr = await page.evaluate(() => localStorage.getItem('user'));

    // accessToken 확인
    expect(accessToken).toBeTruthy();
    expect(accessToken).toContain('.');

    // user 정보 확인
    expect(userStr).toBeTruthy();
    const user = JSON.parse(userStr!);
    expect(user._id).toBeDefined();
    expect(user._id).toBeTruthy();
    expect(user.name).toBeDefined();
    expect(user.name).toBeTruthy();
  });

  test('로그인 실패 시 로그인실패 모달이 표시되어야 한다', async ({ page }) => {
    // API 모킹 (실패 시나리오)
    await page.route('**/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '이메일 또는 비밀번호가 일치하지 않습니다.',
            },
          ],
        }),
      });
    });

    // 폼 입력
    await page.locator('[data-testid="auth-login-email-input"]').fill('wrong@example.com');
    await page.locator('[data-testid="auth-login-password-input"]').fill('wrongpassword');

    // 로그인 버튼 클릭
    await page.locator('[data-testid="auth-login-submit-button"]').click();

    // 로그인실패 모달 표시 확인
    const errorModal = page.locator('[data-testid="auth-login-error-modal"]');
    await expect(errorModal).toBeVisible({ timeout: 2000 });

    // 모달 제목 확인
    await expect(errorModal.locator('[data-testid="modal-title"]')).toContainText('로그인 실패');

    // 확인 버튼 클릭
    await page.locator('[data-testid="modal-primary-button"]').click();

    // 모달이 닫히고 여전히 로그인 페이지에 있는지 확인
    await expect(errorModal).not.toBeVisible({ timeout: 500 });
    await expect(page).toHaveURL('/auth/login');
  });
});

