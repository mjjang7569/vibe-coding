import { test, expect } from '@playwright/test';

test.describe('Diaries Link Modal Hook', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="diary-search-input"]', { timeout: 500 });
  });

  test('일기쓰기 버튼 클릭시 모달이 열리는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[aria-label="새 일기 작성하기"]');
    
    // 모달이 열렸는지 확인 (DiariesNew 컴포넌트의 data-testid 확인)
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    
    // 모달 헤더 확인
    await expect(page.locator('[data-testid="diaries-new-title"]')).toHaveText('일기 쓰기');
  });

  test('모달 내부 요소들이 정상적으로 렌더링되는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[aria-label="새 일기 작성하기"]');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    
    // 감정 선택 영역 확인
    await expect(page.locator('[data-testid="diaries-new-emotion-title"]')).toHaveText('오늘 기분은 어땟나요?');
    
    // 제목 입력 영역 확인
    await expect(page.locator('[data-testid="diaries-new-title-input"]')).toBeVisible();
    
    // 내용 입력 영역 확인
    await expect(page.locator('[data-testid="diaries-new-content-textarea"]')).toBeVisible();
    
    // 버튼들 확인
    await expect(page.locator('[data-testid="diaries-new-close-button"]')).toHaveText('닫기');
    await expect(page.locator('[data-testid="diaries-new-submit-button"]')).toHaveText('등록하기');
  });

  test('모달 닫기 버튼 클릭시 모달이 닫히는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[aria-label="새 일기 작성하기"]');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    
    // 닫기 버튼 클릭
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).not.toBeVisible();
  });

  test('모달 오버레이 클릭시 모달이 닫히는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[aria-label="새 일기 작성하기"]');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    
    // 모달 오버레이 클릭 (모달 외부 영역)
    await page.click('.fixed.inset-0.z-50');
    
    // 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).not.toBeVisible();
  });

  test('모달 내부 클릭시 모달이 닫히지 않는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[aria-label="새 일기 작성하기"]');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    
    // 모달 내부 영역 클릭
    await page.click('[data-testid="diaries-new-wrapper"]');
    
    // 모달이 여전히 열려있는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
  });
});
