import { test, expect } from '@playwright/test';

// Window 인터페이스 확장
interface Window {
  __TEST_BYPASS__?: boolean;
}

test.describe('Diaries Link Modal Auth Hook', () => {
  test.describe('비로그인 유저', () => {
    test.beforeEach(async ({ page }) => {
      // 비로그인 상태 설정 (window.__TEST_BYPASS__를 false로 설정하여 인증 검사 수행)
      await page.addInitScript(() => {
        (window as Window).__TEST_BYPASS__ = false;
      });

      // localStorage 초기화 (비로그인 상태)
      await page.goto('/diaries');
      await page.evaluate(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('localStorageChange'));
      });
      
      // 페이지 새로고침하여 비로그인 상태 적용
      await page.reload({ waitUntil: 'domcontentloaded' });
      
      // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="diary-search-input"]');
    });

    test('일기쓰기 버튼 클릭시 로그인 요청 모달이 노출되는지 확인', async ({ page }) => {
      // 일기쓰기 버튼 클릭
      await page.click('[aria-label="새 일기 작성하기"]');
      
      // 로그인 요청 모달 노출 여부 확인
      // auth.guard.hook.tsx에서 표시하는 모달의 제목 "로그인하시겠습니까" 확인
      const modalTitle = page.locator('[data-testid="modal-title"]');
      await expect(modalTitle).toBeVisible();
      await expect(modalTitle).toHaveText('로그인하시겠습니까');
    });
  });

  test.describe('로그인 유저', () => {
    test.beforeEach(async ({ page }) => {
      // 로그인 유저는 기본값이므로 window.__TEST_BYPASS__를 설정하지 않음
      // (테스트 환경에서는 기본적으로 인증 검사를 패스함)

      // localStorage에 로그인 정보 설정 (로그인 상태)
      await page.goto('/diaries');
      await page.evaluate(() => {
        localStorage.setItem('accessToken', 'test-token');
        localStorage.setItem('user', JSON.stringify({ _id: 'test-id', name: 'Test User' }));
        window.dispatchEvent(new Event('localStorageChange'));
      });
      
      // 페이지 새로고침하여 로그인 상태 적용
      await page.reload({ waitUntil: 'domcontentloaded' });
      
      // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="diary-search-input"]');
    });

    test('일기쓰기 버튼 클릭시 일기쓰기 페이지 모달이 노출되는지 확인', async ({ page }) => {
      // 일기쓰기 버튼 클릭
      await page.click('[aria-label="새 일기 작성하기"]');
      
      // 일기쓰기 페이지 모달 노출 여부 확인
      await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
      
      // 모달 헤더 확인
      await expect(page.locator('[data-testid="diaries-new-title"]')).toHaveText('일기 쓰기');
    });
  });
});
