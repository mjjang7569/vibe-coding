import { test, expect } from '@playwright/test';

/**
 * Auth Hook 테스트
 * 인증 상태에 따른 UI 분기 및 로그인/로그아웃 기능을 테스트합니다.
 */
test.describe('Auth Hook Tests', () => {
  
  test.describe('비로그인 유저 시나리오', () => {
    test('비회원으로 /diaries에 접속하여 로그인 버튼이 노출되어야 함', async ({ page }) => {
      // 로컬 스토리지 초기화
      await page.goto('/auth/login');
      await page.evaluate(() => {
        localStorage.clear();
      });

      // /diaries 페이지 접속
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      // 로그인 버튼 확인
      const loginButton = page.locator('[data-testid="layout-login-button"]');
      await expect(loginButton).toBeVisible();
      
      // 로그인 상태 UI는 숨겨져야 함
      const authStatus = page.locator('[data-testid="layout-auth-status"]');
      await expect(authStatus).not.toBeVisible();
    });

    test('로그인 버튼 클릭하여 /auth/login 페이지로 이동해야 함', async ({ page }) => {
      // 로컬 스토리지 초기화
      await page.goto('/auth/login');
      await page.evaluate(() => {
        localStorage.clear();
      });

      // /diaries 페이지 접속
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      // 로그인 버튼 클릭
      const loginButton = page.locator('[data-testid="layout-login-button"]');
      await loginButton.click();
      
      // /auth/login 페이지로 이동 확인
      await page.waitForURL('/auth/login');
      expect(page.url()).toContain('/auth/login');
    });
  });

  test.describe('로그인 유저 시나리오', () => {
    test('로그인 후 유저이름과 로그아웃 버튼이 노출되어야 함', async ({ page }) => {
      // 로컬 스토리지 초기화
      await page.goto('/auth/login');
      await page.evaluate(() => {
        localStorage.clear();
      });

      // 로그인 페이지 접속
      await page.goto('/auth/login');
      await page.waitForSelector('[data-testid="auth-login-form"]');
      
      // 로그인 시도
      const emailInput = page.locator('[data-testid="auth-login-email-input"]');
      const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
      const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
      
      await emailInput.fill('a@c.com');
      await passwordInput.fill('1234qwer');
      await submitButton.click();
      
      // 로그인 성공 모달 대기 및 클릭
      await page.waitForSelector('[data-testid="auth-login-success-modal"]');
      const modalConfirmButton = page.locator('[data-testid="modal-primary-button"]');
      await modalConfirmButton.click();
      
      // /diaries 페이지 로드 확인
      await page.waitForURL('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      // 유저이름 확인
      const userName = page.locator('[data-testid="layout-auth-status"] .userName, [data-testid="layout-auth-status"] span');
      await expect(userName).toBeVisible();
      
      // 로그아웃 버튼 확인
      const logoutButton = page.locator('[data-testid="layout-logout-button"]');
      await expect(logoutButton).toBeVisible();
      
      // 로그인 버튼은 숨겨져야 함
      const loginButton = page.locator('[data-testid="layout-login-button"]');
      await expect(loginButton).not.toBeVisible();
    });

    test('로그아웃 버튼 클릭하여 /auth/login 페이지로 이동해야 함', async ({ page }) => {
      // 로컬 스토리지 초기화
      await page.goto('/auth/login');
      await page.evaluate(() => {
        localStorage.clear();
      });

      // 로그인 페이지 접속
      await page.goto('/auth/login');
      await page.waitForSelector('[data-testid="auth-login-form"]');
      
      // 로그인 시도
      const emailInput = page.locator('[data-testid="auth-login-email-input"]');
      const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
      const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
      
      await emailInput.fill('a@c.com');
      await passwordInput.fill('1234qwer');
      await submitButton.click();
      
      // 로그인 성공 모달 대기 및 클릭
      await page.waitForSelector('[data-testid="auth-login-success-modal"]');
      const modalConfirmButton = page.locator('[data-testid="modal-primary-button"]');
      await modalConfirmButton.click();
      
      // /diaries 페이지 로드 확인
      await page.waitForURL('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      // 로그아웃 버튼 클릭
      const logoutButton = page.locator('[data-testid="layout-logout-button"]');
      await logoutButton.click();
      
      // /auth/login 페이지로 이동 확인
      await page.waitForURL('/auth/login');
      expect(page.url()).toContain('/auth/login');
    });

    test('로그아웃 후 /diaries 접속 시 로그인 버튼이 노출되어야 함', async ({ page }) => {
      // 로컬 스토리지 초기화
      await page.goto('/auth/login');
      await page.evaluate(() => {
        localStorage.clear();
      });

      // 로그인 페이지 접속
      await page.goto('/auth/login');
      await page.waitForSelector('[data-testid="auth-login-form"]');
      
      // 로그인 시도
      const emailInput = page.locator('[data-testid="auth-login-email-input"]');
      const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
      const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
      
      await emailInput.fill('a@c.com');
      await passwordInput.fill('1234qwer');
      await submitButton.click();
      
      // 로그인 성공 모달 대기 및 클릭
      await page.waitForSelector('[data-testid="auth-login-success-modal"]');
      const modalConfirmButton = page.locator('[data-testid="modal-primary-button"]');
      await modalConfirmButton.click();
      
      // /diaries 페이지 로드 확인
      await page.waitForURL('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      // 로그아웃 버튼 클릭
      const logoutButton = page.locator('[data-testid="layout-logout-button"]');
      await logoutButton.click();
      
      // /auth/login 페이지로 이동 확인
      await page.waitForURL('/auth/login');
      
      // /diaries 페이지 접속
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      // 로그인 버튼 확인
      const loginButton = page.locator('[data-testid="layout-login-button"]');
      await expect(loginButton).toBeVisible();
      
      // 로그인 상태 UI는 숨겨져야 함
      const authStatus = page.locator('[data-testid="layout-auth-status"]');
      await expect(authStatus).not.toBeVisible();
    });
  });
});

