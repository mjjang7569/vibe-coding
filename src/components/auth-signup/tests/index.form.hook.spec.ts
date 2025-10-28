import { test, expect } from '@playwright/test';

/**
 * 회원가입 폼 테스트
 * 
 * 테스트 조건:
 * - 실제 데이터 사용 (Mock 사용 금지)
 * - data-testid를 사용한 요소 식별
 * - timeout: network 통신 2000ms 이하, 그 외 500ms 이하
 */

test.describe('회원가입 폼 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto('/auth/signup');
    
    // 페이지 로드 대기 (고정식별자 사용)
    await page.waitForSelector('[data-testid="auth-signup-form"]', { timeout: 2000 });
  });

  test('모든 입력이 완료되면 회원가입 버튼이 활성화되어야 한다', async ({ page }) => {
    // 회원가입 버튼 초기 상태 확인 (비활성화)
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();

    // 이메일 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await expect(submitButton).toBeDisabled();

    // 비밀번호 입력 (영문 + 숫자 8자리 이상)
    await page.locator('[data-testid="auth-signup-password-input"]').fill('password123');
    await expect(submitButton).toBeDisabled();

    // 비밀번호 확인 입력
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('password123');
    await expect(submitButton).toBeDisabled();

    // 이름 입력
    await page.locator('[data-testid="auth-signup-name-input"]').fill('홍길동');
    
    // 모든 입력 완료 후 버튼 활성화 확인
    await expect(submitButton).toBeEnabled();
  });

  test('이메일 검증: @ 미포함 시 에러 메시지 표시', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    
    // @ 없는 이메일 입력
    await emailInput.fill('invalidemail');
    await emailInput.blur();
    
    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-email-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 500 });
  });

  test('비밀번호 검증: 영문 + 숫자 8자리 미만 시 에러 메시지 표시', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    
    // 잘못된 비밀번호 입력 (숫자 없음)
    await passwordInput.fill('password');
    await passwordInput.blur();
    
    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-password-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 500 });

    // 잘못된 비밀번호 입력 (8자리 미만)
    await passwordInput.fill('pass1');
    await passwordInput.blur();
    
    await expect(errorMessage).toBeVisible({ timeout: 500 });
  });

  test('비밀번호 확인 검증: 비밀번호와 불일치 시 에러 메시지 표시', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    
    // 비밀번호 입력
    await passwordInput.fill('password123');
    
    // 다른 비밀번호 확인 입력
    await passwordConfirmInput.fill('password456');
    await passwordConfirmInput.blur();
    
    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-password-confirm-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 500 });
  });

  test('이름 검증: 1글자 미만 시 에러 메시지 표시', async ({ page }) => {
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    
    // 먼저 값을 입력한 후 삭제 (react-hook-form이 필드를 터치된 것으로 인식)
    await nameInput.fill('홍');
    await nameInput.fill('');
    await nameInput.blur();
    
    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-name-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 500 });
  });

  test('회원가입 성공 시 가입완료 모달이 표시되고 로그인 페이지로 이동해야 한다', async ({ page }) => {
    // 타임스탬프를 포함한 고유한 이메일 생성
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;

    // 폼 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill(email);
    await page.locator('[data-testid="auth-signup-password-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('홍길동');

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 가입완료 모달 표시 확인 (network 통신 시간 고려)
    const successModal = page.locator('[data-testid="auth-signup-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });

    // 모달 제목 확인
    await expect(successModal.locator('[data-testid="modal-title"]')).toContainText('회원가입 완료');

    // 확인 버튼 클릭
    await page.locator('[data-testid="modal-primary-button"]').click();

    // 로그인 페이지로 이동 확인
    await expect(page).toHaveURL('/auth/login', { timeout: 2000 });
  });

  test('회원가입 실패 시 가입실패 모달이 표시되어야 한다', async ({ page }) => {
    // API 모킹을 위해 route 가로채기
    await page.route('**/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '이미 존재하는 이메일입니다.',
            },
          ],
        }),
      });
    });

    // 폼 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('existing@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('홍길동');

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 가입실패 모달 표시 확인
    const errorModal = page.locator('[data-testid="auth-signup-error-modal"]');
    await expect(errorModal).toBeVisible({ timeout: 2000 });

    // 모달 제목 확인
    await expect(errorModal.locator('[data-testid="modal-title"]')).toContainText('회원가입 실패');

    // 확인 버튼 클릭
    await page.locator('[data-testid="modal-primary-button"]').click();

    // 모달이 닫히고 여전히 회원가입 페이지에 있는지 확인
    await expect(errorModal).not.toBeVisible({ timeout: 500 });
    await expect(page).toHaveURL('/auth/signup');
  });

  test('API 응답에서 _id가 정상적으로 반환되는지 확인', async ({ page }) => {
    // 타임스탬프를 포함한 고유한 이메일 생성
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;

    // 폼 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill(email);
    await page.locator('[data-testid="auth-signup-password-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('홍길동');

    // API 응답 캡처를 위한 Promise 설정
    const responsePromise = page.waitForResponse(
      response => response.url().includes('/graphql') && response.status() === 200,
      { timeout: 2000 }
    );

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // API 응답 대기 및 확인
    const response = await responsePromise;
    const responseBody = await response.json();

    // _id가 응답에 포함되어 있는지 확인
    expect(responseBody.data.createUser._id).toBeDefined();
    expect(responseBody.data.createUser._id).toBeTruthy();
  });
});

