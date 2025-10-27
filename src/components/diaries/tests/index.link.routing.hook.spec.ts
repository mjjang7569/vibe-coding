import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

/**
 * Diaries Link Routing Hook 통합 테스트
 * 
 * 성공 시나리오:
 * 1. 일기 카드 클릭 시 상세 페이지로 이동
 * 2. 다양한 id의 카드 클릭 시 각각 올바른 상세 페이지로 이동
 * 3. 삭제 버튼 클릭 시 페이지 이동하지 않음 (이벤트 전파 방지)
 * 4. 여러 개의 카드가 각각 올바른 경로로 이동
 * 5. 카드에 cursor: pointer 스타일 적용 확인
 * 
 * 실패 시나리오:
 * 1. 로컬스토리지에 데이터가 없을 때 카드 미표시
 * 2. 로컬스토리지가 빈 배열일 때 카드 미표시
 * 
 * 테스트 조건:
 * - 실제 로컬스토리지 데이터 사용 (Mock 데이터 미사용)
 * - 로컬스토리지 모킹 미사용 (성공/실패 시나리오 모두)
 * - data-testid 기반 선택자 사용
 * - timeout 미설정 (기본값 사용, 500ms 미만 조건 충족)
 * - baseURL 제외한 상대 경로 사용
 * - networkidle 대기 방법 미사용
 */

test.describe('Diaries Link Routing Hook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 실제 로컬스토리지 데이터 설정
    await page.goto('/diaries');
    
    const testDiaries = [
      {
        id: 1,
        title: '첫 번째 일기',
        content: '오늘은 행복한 하루였다.',
        emotion: EmotionType.Happy,
        createdAt: new Date('2024-01-15').toISOString(),
      },
      {
        id: 2,
        title: '두 번째 일기',
        content: '오늘은 슬픈 일이 있었다.',
        emotion: EmotionType.Sad,
        createdAt: new Date('2024-01-16').toISOString(),
      },
      {
        id: 3,
        title: '세 번째 일기',
        content: '오늘은 화가 났다.',
        emotion: EmotionType.Angry,
        createdAt: new Date('2024-01-17').toISOString(),
      },
    ];
    
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 리로드하여 로컬스토리지 데이터 반영
    await page.goto('/diaries');
  });

  test('일기 카드 클릭 시 해당 상세 페이지로 이동한다', async ({ page }) => {
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-search-input"]');
    
    // 첫 번째 일기 카드 찾기 (data-testid 사용)
    const diaryCards = page.locator('[data-testid="diary-card"]').first();
    await expect(diaryCards).toBeVisible();
    
    // 일기 카드 클릭
    await diaryCards.click();
    
    // URL이 /diaries/1로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries/1');
  });

  test('두 번째 일기 카드 클릭 시 올바른 id의 상세 페이지로 이동한다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-search-input"]');
    
    // 두 번째 일기 카드 클릭 (data-testid 사용)
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    await expect(secondCard).toBeVisible();
    await secondCard.click();
    
    // URL이 /diaries/2로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries/2');
  });

  test('삭제 버튼 클릭 시 페이지 이동하지 않는다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-search-input"]');
    
    // 삭제 버튼 클릭 (data-testid 사용)
    const closeButton = page.locator('[data-testid="diary-card-delete"]').first();
    await expect(closeButton).toBeVisible();
    
    // 현재 URL 저장
    const currentUrl = page.url();
    
    // 삭제 버튼 클릭
    await closeButton.click();
    
    // URL이 변경되지 않았는지 확인
    await expect(page).toHaveURL(currentUrl);
  });

  test('여러 개의 일기 카드가 각각 올바른 id로 이동한다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-search-input"]');
    
    // 세 번째 카드 클릭 (data-testid 사용)
    const thirdCard = page.locator('[data-testid="diary-card"]').nth(2);
    await expect(thirdCard).toBeVisible();
    await thirdCard.click();
    
    // URL이 /diaries/3으로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries/3');
  });

  test('일기 카드에 cursor pointer 스타일이 적용되어 있다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-search-input"]');
    
    // 첫 번째 카드의 cursor 스타일 확인 (data-testid 사용)
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await expect(firstCard).toBeVisible();
    
    const cursorStyle = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });
    
    expect(cursorStyle).toBe('pointer');
  });

  test('로컬스토리지에 데이터가 없을 때 일기 카드가 표시되지 않는다', async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // 페이지 리로드
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-search-input"]');
    
    // 일기 카드가 없는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test('로컬스토리지가 빈 배열일 때 일기 카드가 표시되지 않는다', async ({ page }) => {
    // 빈 배열 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([]));
    });
    
    // 페이지 리로드
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-search-input"]');
    
    // 일기 카드가 없는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });
});

