import { test, expect } from '@playwright/test';

/**
 * Pictures 컴포넌트 - 필터 훅 테스트
 * 
 * 테스트 대상: 강아지 사진 필터 기능
 * - 기본: 640 x 640
 * - 가로형: 640 x 480
 * - 세로형: 480 x 640
 */

test.describe('Pictures - Filter Hook', () => {
  test.beforeEach(async ({ page }) => {
    // /pictures 페이지로 이동
    await page.goto('http://localhost:3000/pictures');
    
    // 페이지 로드 대기 - data-testid로 식별
    await page.waitForSelector('[data-testid="pictures-container"]', {
      state: 'visible',
    });
  });

  test('페이지 로드 시 기본 필터가 선택되어 있고, 이미지가 640x640으로 표시되어야 함', async ({ page }) => {
    // 필터 선택박스가 있는지 확인
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await expect(filterSelectbox).toBeVisible();
    
    // 기본 필터가 선택되어 있는지 확인
    await expect(filterSelectbox).toHaveText(/기본/);
    
    // 첫 번째 이미지가 로드될 때까지 대기
    const firstImage = page.locator('[data-testid="picture-item"]').first();
    await expect(firstImage).toBeVisible({ timeout: 2000 });
    
    // 이미지의 width와 height 속성 확인
    const firstImageElement = firstImage.locator('img');
    await expect(firstImageElement).toHaveAttribute('width', '640');
    await expect(firstImageElement).toHaveAttribute('height', '640');
  });

  test('가로형 필터 선택 시 이미지가 640x480으로 변경되어야 함', async ({ page }) => {
    // 필터 선택박스 클릭
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    
    // 드롭다운에서 "가로형" 선택
    const horizontalOption = page.locator('[data-testid="filter-selectbox-option-horizontal"]');
    await expect(horizontalOption).toBeVisible();
    await horizontalOption.click();
    
    // 필터가 "가로형"으로 변경되었는지 확인
    await expect(filterSelectbox).toHaveText(/가로형/);
    
    // 이미지가 640x480으로 변경되었는지 확인
    const firstImage = page.locator('[data-testid="picture-item"]').first();
    const firstImageElement = firstImage.locator('img');
    await expect(firstImageElement).toHaveAttribute('width', '640');
    await expect(firstImageElement).toHaveAttribute('height', '480');
  });

  test('세로형 필터 선택 시 이미지가 480x640으로 변경되어야 함', async ({ page }) => {
    // 필터 선택박스 클릭
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    
    // 드롭다운에서 "세로형" 선택
    const verticalOption = page.locator('[data-testid="filter-selectbox-option-vertical"]');
    await expect(verticalOption).toBeVisible();
    await verticalOption.click();
    
    // 필터가 "세로형"으로 변경되었는지 확인
    await expect(filterSelectbox).toHaveText(/세로형/);
    
    // 이미지가 480x640으로 변경되었는지 확인
    const firstImage = page.locator('[data-testid="picture-item"]').first();
    const firstImageElement = firstImage.locator('img');
    await expect(firstImageElement).toHaveAttribute('width', '480');
    await expect(firstImageElement).toHaveAttribute('height', '640');
  });

  test('필터를 여러 번 변경해도 정상적으로 작동해야 함', async ({ page }) => {
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    const firstImage = page.locator('[data-testid="picture-item"]').first();
    const firstImageElement = firstImage.locator('img');
    
    // 기본 -> 가로형
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-horizontal"]').click();
    await expect(firstImageElement).toHaveAttribute('width', '640');
    await expect(firstImageElement).toHaveAttribute('height', '480');
    
    // 가로형 -> 세로형
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-vertical"]').click();
    await expect(firstImageElement).toHaveAttribute('width', '480');
    await expect(firstImageElement).toHaveAttribute('height', '640');
    
    // 세로형 -> 기본
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-basic"]').click();
    await expect(firstImageElement).toHaveAttribute('width', '640');
    await expect(firstImageElement).toHaveAttribute('height', '640');
  });

  test('모든 이미지에 필터가 동일하게 적용되어야 함', async ({ page }) => {
    // 가로형 필터 선택
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-horizontal"]').click();
    
    // 최소 3개의 이미지가 로드될 때까지 대기
    await expect(page.locator('[data-testid="picture-item"]')).toHaveCount(6, { timeout: 2000 });
    
    // 모든 이미지가 640x480인지 확인
    const images = page.locator('[data-testid="picture-item"] img');
    const count = await images.count();
    
    for (let i = 0; i < Math.min(count, 6); i++) {
      const image = images.nth(i);
      await expect(image).toHaveAttribute('width', '640');
      await expect(image).toHaveAttribute('height', '480');
    }
  });

  test('이미지 로딩 중 필터 변경 시에도 정상적으로 작동해야 함', async ({ page }) => {
    // 페이지 새로고침하여 로딩 상태 재현
    await page.reload();
    
    // 컨테이너가 로드되자마자 필터 변경 (이미지 로딩 전)
    await page.waitForSelector('[data-testid="pictures-container"]');
    
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-vertical"]').click();
    
    // 이미지가 로드될 때까지 대기
    await expect(page.locator('[data-testid="picture-item"]').first()).toBeVisible({ timeout: 2000 });
    
    // 필터가 적용되었는지 확인
    const firstImageElement = page.locator('[data-testid="picture-item"]').first().locator('img');
    await expect(firstImageElement).toHaveAttribute('width', '480');
    await expect(firstImageElement).toHaveAttribute('height', '640');
  });

  test('스플래시 스크린도 필터에 따라 사이즈가 변경되어야 함', async ({ page }) => {
    // API 응답을 지연시켜 스플래시 스크린 확인
    await page.route('**/api/breeds/image/random/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 300));
      await route.continue();
    });
    
    // 세로형 필터 선택
    const pagePromise = page.goto('http://localhost:3000/pictures');
    
    await page.waitForSelector('[data-testid="pictures-container"]');
    
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-vertical"]').click();
    
    // 스플래시 스크린이 있다면 스타일 확인
    const splashScreens = page.locator('[data-testid="picture-splash-screen"]');
    const splashCount = await splashScreens.count().catch(() => 0);
    
    if (splashCount > 0) {
      const firstSplash = splashScreens.first();
      const style = await firstSplash.getAttribute('style');
      expect(style).toContain('480px');
      expect(style).toContain('640px');
    }
    
    await pagePromise;
  });

  test('이미지 컨테이너(pictureItem)의 DOM 스타일도 필터에 따라 변경되어야 함', async ({ page }) => {
    // 가로형 필터 선택
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-horizontal"]').click();
    
    // 이미지가 로드될 때까지 대기
    await expect(page.locator('[data-testid="picture-item"]').first()).toBeVisible({ timeout: 2000 });
    
    // pictureItem의 스타일 확인
    const firstPictureItem = page.locator('[data-testid="picture-item"]').first();
    const style = await firstPictureItem.getAttribute('style');
    
    // width: 640px, height: 480px 스타일이 적용되었는지 확인
    expect(style).toContain('640px');
    expect(style).toContain('480px');
  });

  test('페이지 새로고침 시 필터는 기본값으로 리셋되어야 함', async ({ page }) => {
    // 필터를 세로형으로 변경
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-vertical"]').click();
    
    // 필터가 세로형으로 변경되었는지 확인
    await expect(filterSelectbox).toHaveText(/세로형/);
    
    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="pictures-container"]');
    
    // 필터가 기본값으로 리셋되었는지 확인
    await expect(filterSelectbox).toHaveText(/기본/);
    
    // 이미지가 기본 사이즈(640x640)로 표시되는지 확인
    const firstImage = page.locator('[data-testid="picture-item"]').first();
    await expect(firstImage).toBeVisible({ timeout: 2000 });
    
    const firstImageElement = firstImage.locator('img');
    await expect(firstImageElement).toHaveAttribute('width', '640');
    await expect(firstImageElement).toHaveAttribute('height', '640');
  });

  test('필터 변경이 빠르게 연속으로 발생해도 정상 작동해야 함', async ({ page }) => {
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    
    // 빠르게 여러 번 필터 변경
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-horizontal"]').click();
    
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-vertical"]').click();
    
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-basic"]').click();
    
    await filterSelectbox.click();
    await page.locator('[data-testid="filter-selectbox-option-horizontal"]').click();
    
    // 최종 필터 상태 확인
    await expect(filterSelectbox).toHaveText(/가로형/);
    
    // 최종 이미지 사이즈 확인
    const firstImage = page.locator('[data-testid="picture-item"]').first();
    const firstImageElement = firstImage.locator('img');
    await expect(firstImageElement).toHaveAttribute('width', '640');
    await expect(firstImageElement).toHaveAttribute('height', '480');
  });

  test('이미지가 없는 상태(로딩 실패)에서도 필터 변경이 가능해야 함', async ({ page }) => {
    // API 요청을 가로채서 실패하도록 모킹
    await page.route('**/api/breeds/image/random/**', route => {
      route.abort('failed');
    });
    
    // 페이지 로드
    await page.goto('http://localhost:3000/pictures');
    await page.waitForSelector('[data-testid="pictures-container"]');
    
    // 필터 변경이 가능한지 확인
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    
    const horizontalOption = page.locator('[data-testid="filter-selectbox-option-horizontal"]');
    await expect(horizontalOption).toBeVisible();
    await horizontalOption.click();
    
    // 필터가 변경되었는지 확인
    await expect(filterSelectbox).toHaveText(/가로형/);
  });

  test('필터 드롭다운이 열려있는 상태에서 모든 옵션이 표시되어야 함', async ({ page }) => {
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    
    // 모든 필터 옵션이 표시되는지 확인
    await expect(page.locator('[data-testid="filter-selectbox-option-basic"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-selectbox-option-horizontal"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-selectbox-option-vertical"]')).toBeVisible();
    
    // 3개의 옵션만 있는지 확인
    const options = page.locator('[data-testid^="filter-selectbox-option-"]');
    await expect(options).toHaveCount(3);
  });
});

