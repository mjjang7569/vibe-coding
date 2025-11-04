import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 테스트용 일기 데이터 타입
 */
interface DiaryItem {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * 테스트용 일기 데이터 생성
 */
const createTestDiaries = (): DiaryItem[] => [
  {
    id: 1,
    title: '테스트 일기 1',
    content: '테스트 내용 1',
    emotion: EmotionType.Happy,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 2,
    title: '테스트 일기 2',
    content: '테스트 내용 2',
    emotion: EmotionType.Sad,
    createdAt: new Date('2024-01-02').toISOString(),
  },
  {
    id: 3,
    title: '테스트 일기 3',
    content: '테스트 내용 3',
    emotion: EmotionType.Angry,
    createdAt: new Date('2024-01-03').toISOString(),
  },
];

test.describe('일기 삭제 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트 일기 데이터 설정
    const testDiaries = createTestDiaries();
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    await page.reload();
  });

  test.describe('비로그인 사용자', () => {
    test.beforeEach(async ({ page }) => {
      // 비로그인 상태 명시적 설정
      await page.goto('/diaries');
      await page.evaluate(() => {
        // 테스트용 전역 변수를 false로 설정하여 실제 권한 검사 수행
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__TEST_BYPASS__ = false;
        
        // 로그인 데이터 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
    });

    test('일기 카드의 삭제 아이콘(X)이 미노출되어야 함', async ({ page }) => {
      // Given: /diaries 페이지에 비로그인 상태로 접속
      // (beforeEach에서 설정됨)
      
      // When: 일기 카드의 삭제 아이콘을 확인
      const diaryCards = page.locator('[data-testid="diary-card"]');
      const count = await diaryCards.count();
      
      // Then: 모든 일기 카드의 삭제 아이콘이 숨겨져 있어야 함
      for (let i = 0; i < count; i++) {
        const card = diaryCards.nth(i);
        const deleteButton = card.locator('[data-testid="diary-card-delete"]');
        await expect(deleteButton).toBeHidden();
      }
    });
  });

  test.describe('로그인 사용자', () => {
    test.beforeEach(async ({ page }) => {
      // 로그인 상태 설정 (window.__TEST_BYPASS__ 사용)
      await page.goto('/diaries');
      await page.evaluate(() => {
        // 테스트용 전역 변수 설정
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__TEST_BYPASS__ = true;
        
        // 실제 로그인 데이터 설정
        localStorage.setItem('accessToken', 'test-access-token');
        localStorage.setItem('user', JSON.stringify({
          _id: 'test-user-id',
          name: 'Test User'
        }));
      });
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
    });

    test('일기 카드의 삭제 아이콘(X)이 노출되어야 함', async ({ page }) => {
      // Given: /diaries 페이지에 로그인 상태로 접속
      // (beforeEach에서 설정됨)
      
      // When: 일기 카드의 삭제 아이콘을 확인
      const diaryCards = page.locator('[data-testid="diary-card"]');
      const count = await diaryCards.count();
      
      // Then: 모든 일기 카드의 삭제 아이콘이 표시되어야 함
      for (let i = 0; i < count; i++) {
        const card = diaryCards.nth(i);
        const deleteButton = card.locator('[data-testid="diary-card-delete"]');
        await expect(deleteButton).toBeVisible();
      }
    });

    test('삭제 아이콘(X) 클릭 시 삭제 모달이 노출되어야 함', async ({ page }) => {
      // Given: 로그인 상태에서 일기 목록 페이지에 접속
      // (beforeEach에서 설정됨)
      
      // When: 첫 번째 일기 카드의 삭제 아이콘 클릭
      const firstCard = page.locator('[data-testid="diary-card"]').first();
      const deleteButton = firstCard.locator('[data-testid="diary-card-delete"]');
      await deleteButton.click();

      // Then: 삭제 모달이 표시되어야 함
      const modal = page.locator('[data-testid="modal-title"]');
      await expect(modal).toBeVisible({ timeout: 500 });
      await expect(modal).toHaveText('일기 삭제');
    });

    test('삭제 모달에서 "취소" 클릭 시 모달이 닫혀야 함', async ({ page }) => {
      // Given: 삭제 모달이 열린 상태
      const firstCard = page.locator('[data-testid="diary-card"]').first();
      const deleteButton = firstCard.locator('[data-testid="diary-card-delete"]');
      await deleteButton.click();
      
      const modal = page.locator('[data-testid="modal-title"]');
      await expect(modal).toBeVisible({ timeout: 500 });

      // When: "취소" 버튼 클릭
      const cancelButton = page.locator('[data-testid="diary-delete-cancel"]');
      await cancelButton.click();

      // Then: 모달이 닫혀야 함
      await expect(modal).toBeHidden();
    });

    test('삭제 모달에서 "삭제" 클릭 시 일기가 삭제되고 페이지가 새로고침되어야 함', async ({ page }) => {
      // Given: 삭제 모달이 열린 상태
      const initialCount = await page.locator('[data-testid="diary-card"]').count();
      const firstCardTitle = await page.locator('[data-testid="diary-card-title"]').first().textContent();

      const firstCard = page.locator('[data-testid="diary-card"]').first();
      const deleteButton = firstCard.locator('[data-testid="diary-card-delete"]');
      await deleteButton.click();
      
      const modal = page.locator('[data-testid="modal-title"]');
      await expect(modal).toBeVisible({ timeout: 500 });

      // When: "삭제" 버튼 클릭
      const confirmButton = page.locator('[data-testid="diary-delete-confirm"]');
      await confirmButton.click();

      // 페이지 로드 대기 (새로고침됨)
      await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });

      // Then: 일기가 삭제되고 목록이 업데이트되어야 함
      const afterCount = await page.locator('[data-testid="diary-card"]').count();
      expect(afterCount).toBe(initialCount - 1);

      // 삭제된 일기가 목록에 없는지 확인
      const titles = await page.locator('[data-testid="diary-card-title"]').allTextContents();
      expect(titles).not.toContain(firstCardTitle);

      // 로컬스토리지에서도 삭제되었는지 확인
      const diariesInStorage = await page.evaluate(() => {
        const stored = localStorage.getItem('diaries');
        return stored ? JSON.parse(stored) : [];
      });
      expect(diariesInStorage).toHaveLength(initialCount - 1);
    });
  });
});

