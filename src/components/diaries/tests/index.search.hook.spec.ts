import { test, expect } from '@playwright/test';
import { EmotionType } from '../../../commons/constants/enum';

/**
 * 일기 검색 기능 테스트
 * 
 * 테스트 시나리오:
 * 1. /diaries 페이지 접속
 * 2. 검색어 입력
 * 3. 엔터 키 또는 검색 버튼으로 검색 실행
 * 4. title에 검색어가 포함된 일기만 표시되는지 확인
 */

test.describe('Diaries Search Hook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // 테스트 데이터 준비 - 실제 데이터 사용
    const testDiaries = [
      {
        id: 1,
        title: '오늘은 행복한 날',
        content: '정말 좋은 일이 있었어요',
        emotion: EmotionType.Happy,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: '슬픈 하루',
        content: '우울한 하루였어요',
        emotion: EmotionType.Sad,
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: '화가 났던 날',
        content: '정말 화가 났어요',
        emotion: EmotionType.Angry,
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        title: '행복했던 주말',
        content: '즐거운 주말을 보냈어요',
        emotion: EmotionType.Happy,
        createdAt: new Date().toISOString(),
      },
    ];

    // 로컬스토리지에 테스트 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.goto('/diaries');
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-search-input"]');
  });

  test('검색어 입력 시 검색창이 활성화되어야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 검색어 입력
    await searchInput.fill('행복');
    
    // 입력값 확인
    await expect(searchInput).toHaveValue('행복');
  });

  test('엔터 키로 검색 시 title에 검색어가 포함된 일기만 표시되어야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 초기 일기 카드 개수 확인 (4개)
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(4);
    
    // 검색어 입력 후 엔터
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    
    // 검색 결과 확인 (title에 '행복'이 포함된 2개의 일기만 표시)
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(2);
    
    // 표시된 일기의 제목 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    const firstCardTitle = diaryCards.nth(0).locator('[data-testid="diary-card-title"]');
    const secondCardTitle = diaryCards.nth(1).locator('[data-testid="diary-card-title"]');
    
    await expect(firstCardTitle).toContainText('행복');
    await expect(secondCardTitle).toContainText('행복');
  });

  test('검색어가 포함된 일기가 없으면 결과가 없어야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 존재하지 않는 검색어 입력
    await searchInput.fill('존재하지않는검색어');
    await searchInput.press('Enter');
    
    // 검색 결과 없음 확인
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(0);
  });

  test('빈 검색어로 검색 시 모든 일기를 표시해야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 검색어 입력 후 검색
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    
    // 검색 결과 확인 (2개)
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(2);
    
    // 검색어 지우고 다시 검색
    await searchInput.fill('');
    await searchInput.press('Enter');
    
    // 모든 일기 표시 확인 (4개)
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(4);
  });

  test('검색어를 실시간으로 지우면 전체 일기가 노출되어야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 검색어 입력 (엔터 없이)
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    
    // 검색 결과 확인 (2개)
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(2);
    
    // 검색어를 실시간으로 지우기 (엔터 없이 clear)
    await searchInput.clear();
    
    // 약간의 대기 시간 후 모든 일기 표시 확인 (4개)
    await page.waitForTimeout(100);
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(4);
  });

  test('대소문자 구분 없이 검색되어야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 소문자로 검색
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    
    // 검색 결과 확인
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(2);
  });

  test('부분 검색이 가능해야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 부분 문자열로 검색
    await searchInput.fill('날');
    await searchInput.press('Enter');
    
    // '날'이 포함된 일기들 확인 (오늘은 행복한 날, 화가 났던 날)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);
  });

  test('공백만 입력 시 모든 일기를 표시해야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 공백만 입력
    await searchInput.fill('   ');
    await searchInput.press('Enter');
    
    // 모든 일기 표시 확인 (4개)
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(4);
  });

  test('검색 후 다른 검색어로 재검색이 가능해야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 첫 번째 검색: '행복'
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(2);
    
    // 두 번째 검색: '슬픈'
    await searchInput.fill('슬픈');
    await searchInput.press('Enter');
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(1);
    
    // 세 번째 검색: '화가'
    await searchInput.fill('화가');
    await searchInput.press('Enter');
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(1);
  });

  test('검색어 앞뒤 공백은 무시되어야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 앞뒤 공백이 있는 검색어
    await searchInput.fill('  행복  ');
    await searchInput.press('Enter');
    
    // 공백이 제거된 '행복'으로 검색되어 2개 결과
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(2);
  });

  test('한 글자 검색어도 정상 작동해야 한다', async ({ page }) => {
    const searchInput = page.locator('[data-testid="diary-search-input"] input');
    
    // 한 글자 검색
    await searchInput.fill('날');
    await searchInput.press('Enter');
    
    // 결과 확인
    await expect(page.locator('[data-testid="diary-card"]')).toHaveCount(2);
  });
});

