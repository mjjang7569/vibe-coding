import { test, expect } from '@playwright/test';
import { EmotionType } from '../../../commons/constants/enum';

/**
 * 페이지네이션 훅 테스트
 * 
 * TDD 기반으로 페이지네이션 기능을 테스트합니다.
 * - 실제 로컬스토리지 데이터 사용 (Mock 데이터 사용 안 함)
 * - data-testid 기반 식별
 * - timeout 500ms 미만
 */

// 테스트용 다이어리 데이터 생성 (50개 이상의 데이터로 페이지네이션 테스트)
const createTestDiaries = (count: number) => {
  const diaries = [];
  const emotions = [EmotionType.Happy, EmotionType.Sad, EmotionType.Angry, EmotionType.Surprise, EmotionType.Etc];
  
  for (let i = 1; i <= count; i++) {
    diaries.push({
      id: i,
      title: `테스트 일기 ${i}`,
      content: `테스트 콘텐츠 ${i}`,
      emotion: emotions[(i - 1) % emotions.length],
      createdAt: new Date(2025, 0, i).toISOString()
    });
  }
  
  return diaries;
};

// 검색 관련 테스트용 데이터 (검색어 포함)
const createSearchTestDiaries = () => {
  const emotions = [EmotionType.Happy, EmotionType.Sad, EmotionType.Angry, EmotionType.Surprise, EmotionType.Etc];
  const diaries = [];
  
  // "검색" 키워드가 포함된 일기 15개
  for (let i = 1; i <= 15; i++) {
    diaries.push({
      id: i,
      title: `검색 테스트 일기 ${i}`,
      content: `검색 테스트 콘텐츠 ${i}`,
      emotion: emotions[(i - 1) % emotions.length],
      createdAt: new Date(2025, 0, i).toISOString()
    });
  }
  
  // 일반 일기 35개
  for (let i = 16; i <= 50; i++) {
    diaries.push({
      id: i,
      title: `일반 테스트 일기 ${i}`,
      content: `일반 테스트 콘텐츠 ${i}`,
      emotion: emotions[(i - 1) % emotions.length],
      createdAt: new Date(2025, 0, i).toISOString()
    });
  }
  
  return diaries;
};

test.describe('페이지네이션 기능 테스트', () => {
  
  test.beforeEach(async ({ page }) => {
    // 50개의 테스트 데이터 생성 (페이지 4개 + 나머지)
    const testDiaries = createTestDiaries(50);
    
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    
    // 페이지 로드 확인 (data-testid 대기)
    await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
  });
  
  test('1페이지에 12개의 일기카드가 노출되는지 확인', async ({ page }) => {
    // Given: /diaries 페이지 접속
    
    // When: 페이지 로드 완료
    const diaryCards = await page.locator('[data-testid="diary-card"]').all();
    
    // Then: 12개의 일기카드가 노출되어야 함
    expect(diaryCards.length).toBe(12);
  });
  
  test('페이지 번호가 1, 2, 3, 4, 5 형태로 5개 단위로 노출되는지 확인', async ({ page }) => {
    // Given: /diaries 페이지 접속
    
    // When: 페이지네이션 영역 확인
    const pageButtons = await page.locator('[data-testid^="page-button-"]').all();
    
    // Then: 페이지 번호가 최대 5개까지 표시되어야 함
    expect(pageButtons.length).toBeLessThanOrEqual(5);
    
    // 첫 번째 페이지 번호는 1이어야 함
    const firstPageText = await pageButtons[0].textContent();
    expect(firstPageText).toBe('1');
  });
  
  test('페이지 번호 클릭 시 해당 페이지의 일기 목록이 표시되는지 확인', async ({ page }) => {
    // Given: /diaries 페이지 접속
    await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
    
    // 첫 번째 페이지의 첫 번째 일기 제목 저장
    const firstPageFirstTitle = await page.locator('[data-testid="diary-card-title"]').first().textContent();
    
    // When: 2페이지 클릭
    const secondPageButton = page.locator('[data-testid="page-button-2"]');
    await secondPageButton.click();
    
    // Then: 2페이지의 일기 목록이 표시되어야 함
    await page.waitForTimeout(100); // 상태 변경 대기
    const secondPageFirstTitle = await page.locator('[data-testid="diary-card-title"]').first().textContent();
    
    // 첫 번째 페이지와 두 번째 페이지의 제목이 달라야 함
    expect(secondPageFirstTitle).not.toBe(firstPageFirstTitle);
    
    // 여전히 12개의 카드가 표시되어야 함
    const diaryCards = await page.locator('[data-testid="diary-card"]').all();
    expect(diaryCards.length).toBeLessThanOrEqual(12);
  });
  
  test('마지막 페이지에서는 남은 일기만 표시되는지 확인', async ({ page }) => {
    // Given: 50개의 일기가 있음 (4페이지: 12*4=48, 마지막 페이지: 2개)
    
    // When: 5페이지(마지막 페이지) 클릭
    const lastPageButton = page.locator('[data-testid="page-button-5"]');
    await lastPageButton.click();
    
    // Then: 2개의 일기카드만 표시되어야 함
    await page.waitForTimeout(100);
    const diaryCards = await page.locator('[data-testid="diary-card"]').all();
    expect(diaryCards.length).toBe(2);
  });
});

test.describe('검색결과 페이지네이션 테스트', () => {
  
  test.beforeEach(async ({ page }) => {
    // 검색 테스트용 데이터 생성
    const testDiaries = createSearchTestDiaries();
    
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    
    // 페이지 로드 확인
    await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
  });
  
  test('검색어 입력 시 페이지 수가 변경되는지 확인', async ({ page }) => {
    // Given: 50개의 일기 중 15개가 "검색" 키워드 포함
    
    // 검색 전 페이지 버튼 개수 확인
    const beforeSearchButtons = await page.locator('[data-testid^="page-button-"]').all();
    const beforeCount = beforeSearchButtons.length;
    
    // When: "검색" 키워드로 검색
    const searchInput = page.locator('[data-testid="diary-search-input"]');
    await searchInput.fill('검색');
    
    // 검색 결과 대기
    await page.waitForTimeout(200);
    
    // Then: 페이지 수가 줄어들어야 함 (15개 = 2페이지: 12 + 3)
    const afterSearchButtons = await page.locator('[data-testid^="page-button-"]').all();
    const afterCount = afterSearchButtons.length;
    
    // 검색 후 페이지 수는 2개여야 함
    expect(afterCount).toBe(2);
    expect(afterCount).toBeLessThan(beforeCount);
  });
  
  test('검색 결과에서 페이지네이션이 정상 작동하는지 확인', async ({ page }) => {
    // Given: "검색" 키워드로 검색
    const searchInput = page.locator('[data-testid="diary-search-input"]');
    await searchInput.fill('검색');
    await page.waitForTimeout(200);
    
    // When: 1페이지에서 12개 카드 확인
    const firstPageCards = await page.locator('[data-testid="diary-card"]').all();
    expect(firstPageCards.length).toBe(12);
    
    // 2페이지 클릭
    const secondPageButton = page.locator('[data-testid="page-button-2"]');
    await secondPageButton.click();
    await page.waitForTimeout(100);
    
    // Then: 2페이지에서 3개 카드 확인 (총 15개 중 나머지)
    const secondPageCards = await page.locator('[data-testid="diary-card"]').all();
    expect(secondPageCards.length).toBe(3);
  });
});

test.describe('필터결과 페이지네이션 테스트', () => {
  
  test.beforeEach(async ({ page }) => {
    // 50개의 테스트 데이터 생성 (각 감정이 균등하게 분포)
    const testDiaries = createTestDiaries(50);
    
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    
    // 페이지 로드 확인
    await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
  });
  
  test('필터 선택 시 페이지 수가 변경되는지 확인', async ({ page }) => {
    // Given: 50개의 일기 (각 감정당 10개씩)
    
    // When: "행복해요" 필터 선택
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();
    
    // 드롭다운 옵션 대기
    await page.waitForTimeout(100);
    
    // "행복해요" 옵션 클릭
    const happyOption = page.locator('text=행복해요').first();
    await happyOption.click();
    
    // 필터 적용 대기
    await page.waitForTimeout(200);
    
    // Then: 페이지 수가 줄어들어야 함 (10개 = 1페이지)
    const pageButtons = await page.locator('[data-testid^="page-button-"]').all();
    
    // "행복해요" 감정만 필터링되어 10개 일기가 1페이지에 모두 표시
    const diaryCards = await page.locator('[data-testid="diary-card"]').all();
    expect(diaryCards.length).toBe(10);
    
    // 페이지 버튼이 없거나 1개여야 함 (totalPages가 1이면 pagination이 렌더링 안됨)
    expect(pageButtons.length).toBeLessThanOrEqual(1);
  });
  
  test('필터 결과에서 페이지네이션이 정상 작동하는지 확인', async ({ page }) => {
    // Given: 더 많은 데이터를 위해 "Sad" 감정 일기 추가 (총 25개)
    const testDiaries = [];
    for (let i = 1; i <= 25; i++) {
      testDiaries.push({
        id: i,
        title: `슬픈 일기 ${i}`,
        content: `슬픈 콘텐츠 ${i}`,
        emotion: EmotionType.Sad,
        createdAt: new Date(2025, 0, i).toISOString()
      });
    }
    
    // 나머지 감정 일기 추가
    for (let i = 26; i <= 50; i++) {
      testDiaries.push({
        id: i,
        title: `기타 일기 ${i}`,
        content: `기타 콘텐츠 ${i}`,
        emotion: EmotionType.Happy,
        createdAt: new Date(2025, 0, i).toISOString()
      });
    }
    
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
    
    // When: "슬퍼요" 필터 선택
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();
    await page.waitForTimeout(100);
    
    const sadOption = page.locator('text=슬퍼요').first();
    await sadOption.click();
    await page.waitForTimeout(200);
    
    // 1페이지에서 12개 카드 확인
    const firstPageCards = await page.locator('[data-testid="diary-card"]').all();
    expect(firstPageCards.length).toBe(12);
    
    // 2페이지 클릭
    const secondPageButton = page.locator('[data-testid="page-button-2"]');
    await secondPageButton.click();
    await page.waitForTimeout(100);
    
    // Then: 2페이지에서 13개 카드 확인 (총 25개 중 나머지)
    const secondPageCards = await page.locator('[data-testid="diary-card"]').all();
    expect(secondPageCards.length).toBe(13);
  });
  
  test('필터와 검색을 동시에 적용했을 때 페이지네이션이 정상 작동하는지 확인', async ({ page }) => {
    // Given: 특정 감정과 검색어가 모두 일치하는 데이터 준비
    const testDiaries = [];
    
    // "Happy" 감정 + "특별한" 키워드 포함 (15개)
    for (let i = 1; i <= 15; i++) {
      testDiaries.push({
        id: i,
        title: `특별한 행복 일기 ${i}`,
        content: `특별한 행복 콘텐츠 ${i}`,
        emotion: EmotionType.Happy,
        createdAt: new Date(2025, 0, i).toISOString()
      });
    }
    
    // "Happy" 감정 + 일반 일기 (10개)
    for (let i = 16; i <= 25; i++) {
      testDiaries.push({
        id: i,
        title: `일반 행복 일기 ${i}`,
        content: `일반 행복 콘텐츠 ${i}`,
        emotion: EmotionType.Happy,
        createdAt: new Date(2025, 0, i).toISOString()
      });
    }
    
    // 다른 감정 일기 (25개)
    for (let i = 26; i <= 50; i++) {
      testDiaries.push({
        id: i,
        title: `기타 일기 ${i}`,
        content: `기타 콘텐츠 ${i}`,
        emotion: EmotionType.Sad,
        createdAt: new Date(2025, 0, i).toISOString()
      });
    }
    
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
    
    // When: "행복해요" 필터 + "특별한" 검색어 적용
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();
    await page.waitForTimeout(100);
    
    const happyOption = page.locator('text=행복해요').first();
    await happyOption.click();
    await page.waitForTimeout(200);
    
    const searchInput = page.locator('[data-testid="diary-search-input"]');
    await searchInput.fill('특별한');
    await page.waitForTimeout(200);
    
    // Then: 15개 일기 = 2페이지 (12 + 3)
    const pageButtons = await page.locator('[data-testid^="page-button-"]').all();
    expect(pageButtons.length).toBe(2);
    
    // 1페이지에 12개 표시
    const firstPageCards = await page.locator('[data-testid="diary-card"]').all();
    expect(firstPageCards.length).toBe(12);
    
    // 2페이지 클릭
    const secondPageButton = page.locator('[data-testid="page-button-2"]');
    await secondPageButton.click();
    await page.waitForTimeout(100);
    
    // 2페이지에 3개 표시
    const secondPageCards = await page.locator('[data-testid="diary-card"]').all();
    expect(secondPageCards.length).toBe(3);
  });
});

