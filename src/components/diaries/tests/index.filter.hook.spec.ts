import { test, expect } from '@playwright/test';
import { EmotionType, getEmotionLabel } from '@/commons/constants/enum';

/**
 * Diaries Filter Hook Integration Tests
 * 
 * 성공 시나리오:
 * 1. 필터선택박스로 emotion별 필터링
 *    - 전체, 행복해요, 슬퍼요, 놀랐어요, 화나요, 기타 필터 동작 확인
 * 2. 검색 결과에 대한 필터링
 *    - 검색 후 필터 적용
 *    - 필터 후 검색 적용
 *    - 검색 초기화 후 필터 유지
 * 3. 필터 메뉴 옵션 확인
 *    - enum.ts의 모든 EmotionType이 메뉴에 표시되는지 확인
 * 
 * 테스트 조건:
 * - 실제 로컬스토리지 데이터 사용 (Mock 데이터 미사용)
 * - 로컬스토리지 모킹 미사용
 * - data-testid 기반 선택자 사용
 * - timeout 500ms 이하 설정
 * - baseURL 제외한 상대 경로 사용
 * - networkidle 대기 방법 미사용
 */

test.describe('Diaries Filter Hook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 실제 로컬스토리지 데이터 설정
    await page.goto('/diaries');
    
    // 테스트 데이터 준비 - 실제 데이터 사용
    const testDiaries = [
      {
        id: 1,
        title: '행복한 하루',
        content: '오늘은 정말 행복한 하루였다.',
        emotion: EmotionType.Happy,
        createdAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 2,
        title: '슬픈 하루',
        content: '오늘은 슬픈 일이 있었다.',
        emotion: EmotionType.Sad,
        createdAt: '2024-01-02T00:00:00.000Z'
      },
      {
        id: 3,
        title: '놀라운 하루',
        content: '오늘은 놀라운 일이 있었다.',
        emotion: EmotionType.Surprise,
        createdAt: '2024-01-03T00:00:00.000Z'
      },
      {
        id: 4,
        title: '화나는 하루',
        content: '오늘은 화가 났다.',
        emotion: EmotionType.Angry,
        createdAt: '2024-01-04T00:00:00.000Z'
      },
      {
        id: 5,
        title: '또 행복한 하루',
        content: '오늘도 행복했다.',
        emotion: EmotionType.Happy,
        createdAt: '2024-01-05T00:00:00.000Z'
      },
      {
        id: 6,
        title: '기타 감정의 하루',
        content: '오늘은 특별한 감정이다.',
        emotion: EmotionType.Etc,
        createdAt: '2024-01-06T00:00:00.000Z'
      }
    ];
    
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 리로드하여 로컬스토리지 데이터 반영
    await page.goto('/diaries');
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-list"]', { timeout: 500 });
  });

  test('필터선택박스 - 선택 가능한 메뉴 확인', async ({ page }) => {
    // 필터선택박스 클릭
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();

    // 드롭다운 메뉴가 열릴 때까지 대기
    await page.waitForSelector('[role="option"]', { timeout: 500 });

    // 메뉴 옵션들 가져오기
    const options = await page.locator('[role="option"]').allTextContents();

    // 예상되는 메뉴 목록
    const expectedOptions = [
      '전체',
      getEmotionLabel(EmotionType.Happy),
      getEmotionLabel(EmotionType.Sad),
      getEmotionLabel(EmotionType.Angry),
      getEmotionLabel(EmotionType.Surprise),
      getEmotionLabel(EmotionType.Etc)
    ];

    // 메뉴 옵션이 예상과 일치하는지 확인
    expect(options).toEqual(expectedOptions);
  });

  test('필터선택박스 - 행복해요 필터링', async ({ page }) => {
    // 필터선택박스 클릭
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();

    // "행복해요" 선택
    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Happy)}")`).click();

    // 필터링된 카드들 확인
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(2); // "행복한 하루", "또 행복한 하루"

    // 카드 제목 확인
    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['행복한 하루', '또 행복한 하루']);
  });

  test('필터선택박스 - 슬퍼요 필터링', async ({ page }) => {
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();

    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Sad)}")`).click();

    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(1);

    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['슬픈 하루']);
  });

  test('필터선택박스 - 놀랐어요 필터링', async ({ page }) => {
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();

    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Surprise)}")`).click();

    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(1);

    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['놀라운 하루']);
  });

  test('필터선택박스 - 화나요 필터링', async ({ page }) => {
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();

    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Angry)}")`).click();

    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(1);

    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['화나는 하루']);
  });

  test('필터선택박스 - 기타 필터링', async ({ page }) => {
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();

    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Etc)}")`).click();

    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(1);

    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['기타 감정의 하루']);
  });

  test('필터선택박스 - 전체 선택', async ({ page }) => {
    // 먼저 특정 감정으로 필터링
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();
    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Happy)}")`).click();

    // 다시 선택박스 열기
    await selectbox.click();
    
    // "전체" 선택
    await page.locator('[role="option"]:has-text("전체")').click();

    // 모든 카드가 표시되는지 확인 (6개로 수정)
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(6);
  });

  test('검색 결과 필터링 - 검색 후 필터 적용', async ({ page }) => {
    // 검색창에 "하루" 입력
    const searchbar = page.locator('[data-testid="diary-search-input"]');
    await searchbar.fill('하루');

    // 검색 결과 확인 ("하루"가 포함된 일기 5개 + 기타 1개 = 6개 중 5개)
    let cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(5);

    // 필터선택박스로 "행복해요" 선택
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();
    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Happy)}")`).click();

    // 검색 결과 중 "행복해요"만 표시되는지 확인
    cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(2);

    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['행복한 하루', '또 행복한 하루']);
  });

  test('검색 결과 필터링 - 필터 후 검색 적용', async ({ page }) => {
    // 먼저 "행복해요" 필터 선택
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();
    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Happy)}")`).click();

    // 행복한 일기 2개 확인
    let cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(2);

    // 검색창에 "또" 입력
    const searchbar = page.locator('[data-testid="diary-search-input"]');
    await searchbar.fill('또');

    // "행복해요" 중에서 "또"가 포함된 일기만 표시
    cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(1);

    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['또 행복한 하루']);
  });

  test('검색 결과 필터링 - 검색 초기화 후 필터 유지', async ({ page }) => {
    // 필터 선택
    const selectbox = page.locator('[data-testid="diary-category-select"]');
    await selectbox.click();
    await page.locator(`[role="option"]:has-text("${getEmotionLabel(EmotionType.Happy)}")`).click();

    // 검색 입력
    const searchbar = page.locator('[data-testid="diary-search-input"]');
    await searchbar.fill('또');

    // 검색 초기화
    await searchbar.clear();

    // 필터는 유지되고 검색은 초기화된 상태 확인
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(2); // 행복한 일기 2개

    const titles = await cards.locator('[data-testid="diary-card-title"]').allTextContents();
    expect(titles).toEqual(['행복한 하루', '또 행복한 하루']);
  });
});

