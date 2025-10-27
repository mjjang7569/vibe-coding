import { test, expect } from '@playwright/test';

/**
 * DiariesNew Modal Close Hook 통합 테스트
 * 
 * 테스트 시나리오:
 * 1. /diaries 페이지 로드 후 일기쓰기 버튼 클릭
 * 2. 닫기 버튼 클릭 시 등록취소 확인 모달이 2중으로 나타남
 * 3. 계속작성 버튼 클릭 시 등록취소 모달만 닫힘 (일기쓰기 모달 유지)
 * 4. 등록취소 버튼 클릭 시 모든 모달이 닫힘
 */

test.describe('DiariesNew - Modal Close 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지 방문
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="diary-search-input"]', { timeout: 500 });
    
    // 일기쓰기 버튼 클릭
    await page.click('[aria-label="새 일기 작성하기"]');
    
    // 일기쓰기 모달이 열릴 때까지 대기
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]', { timeout: 500 });
  });

  test('닫기 버튼 클릭 시 등록취소 확인 모달이 2중으로 나타남', async ({ page }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소 모달이 나타나는지 확인
    await expect(page.locator('[data-testid="cancel-modal"]')).toBeVisible();
    
    // 모달 제목과 메시지 확인
    await expect(page.locator('[data-testid="cancel-modal"] h2')).toHaveText('일기 등록 취소');
    await expect(page.locator('[data-testid="cancel-modal"] p')).toHaveText('일기 등록을 취소 하시겠어요?');
    
    // 일기쓰기 모달도 여전히 존재하는지 확인 (2중 모달)
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
  });

  test('계속작성 버튼 클릭 시 등록취소 모달만 닫힘', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소 모달이 나타날 때까지 대기
    await expect(page.locator('[data-testid="cancel-modal"]')).toBeVisible();
    
    // 계속작성 버튼 클릭
    await page.click('[data-testid="cancel-modal-continue-button"]');
    
    // 등록취소 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="cancel-modal"]')).not.toBeVisible();
    
    // 일기쓰기 모달은 여전히 열려있는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
  });

  test('등록취소 버튼 클릭 시 모든 모달이 닫힘', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소 모달이 나타날 때까지 대기
    await expect(page.locator('[data-testid="cancel-modal"]')).toBeVisible();
    
    // 등록취소 버튼 클릭
    await page.click('[data-testid="cancel-modal-cancel-button"]');
    
    // 등록취소 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="cancel-modal"]')).not.toBeVisible();
    
    // 일기쓰기 모달도 닫혔는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).not.toBeVisible();
  });

  test('2중 모달 상태에서 overlay 클릭 시 최상단 모달만 닫힘', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소 모달이 나타날 때까지 대기
    await expect(page.locator('[data-testid="cancel-modal"]')).toBeVisible();
    
    // overlay 영역 클릭 (모달 바깥쪽)
    // modal.provider는 최상단 overlay를 클릭하면 closeModal()을 호출함
    await page.locator('.overlay').last().click({ position: { x: 10, y: 10 } });
    
    // 등록취소 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="cancel-modal"]')).not.toBeVisible();
    
    // 일기쓰기 모달은 여전히 열려있는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
  });
});
