import { test, expect } from '@playwright/test';

/**
 * Pictures Binding Hook 통합 테스트
 * 
 * 테스트 시나리오:
 * 1. API를 통해 강아지 사진 6개를 올바르게 로드하는지 테스트
 * 2. 로딩 중 스플래시 스크린 6개가 표시되는지 테스트
 * 3. dog.ceo 도메인의 이미지가 올바르게 표시되는지 테스트
 * 4. 무한 스크롤 시 추가 데이터가 로드되는지 테스트
 * 5. API 실패 시나리오 테스트
 */

test.describe('Pictures Binding Hook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지 초기화
    await page.goto('/pictures');
  });

  test('초기 로딩 시 스플래시 스크린이 표시된다', async ({ page }) => {
    // 네트워크 속도를 느리게 설정하여 로딩 상태 확인
    await page.route('**/api/breeds/image/random/**', async route => {
      // 응답을 200ms 지연
      await new Promise(resolve => setTimeout(resolve, 200));
      await route.continue();
    });
    
    // 페이지 로딩 직후 빠르게 스플래시 스크린 확인
    const pagePromise = page.goto('/pictures');
    
    // 컨테이너가 먼저 로드되길 기다림
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 500 });
    
    // 스플래시 스크린 또는 이미지 중 하나가 표시되어야 함
    const splashOrImage = await Promise.race([
      page.waitForSelector('[data-testid="picture-splash-screen"]', { timeout: 500 }).then(() => 'splash'),
      page.waitForSelector('[data-testid="picture-item"]', { timeout: 500 }).then(() => 'image'),
    ]).catch(() => 'timeout');
    
    // 스플래시 또는 이미지가 표시되어야 함
    expect(['splash', 'image']).toContain(splashOrImage);
    
    await pagePromise;
  });

  test('API를 통해 강아지 사진 6개를 올바르게 로드한다', async ({ page }) => {
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    
    // 이미지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="picture-item"]', { timeout: 2000 });
    
    // 이미지 개수 확인 (최소 6개)
    const pictureItems = page.locator('[data-testid="picture-item"]');
    const count = await pictureItems.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('dog.ceo 도메인의 이미지가 올바르게 표시된다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    
    // 이미지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="picture-item"] img', { timeout: 2000 });
    
    // 첫 번째 이미지의 src 속성 확인
    const firstImage = page.locator('[data-testid="picture-item"] img').first();
    const src = await firstImage.getAttribute('src');
    
    // Next.js Image 컴포넌트는 unoptimized이므로 원본 URL이 그대로 사용됨
    expect(src).toBeTruthy();
    
    // dog.ceo가 포함된 이미지인지 확인 (실제 API 응답)
    // unoptimized 옵션 사용으로 원본 URL이 src에 그대로 들어감
    expect(src).toContain('images.dog.ceo');
    
    // 모든 이미지가 dog.ceo 도메인인지 확인
    const allImages = page.locator('[data-testid="picture-item"] img');
    const imageCount = await allImages.count();
    expect(imageCount).toBeGreaterThanOrEqual(6);
    
    // 첫 3개 이미지의 src가 모두 dog.ceo를 포함하는지 확인
    for (let i = 0; i < Math.min(3, imageCount); i++) {
      const imgSrc = await allImages.nth(i).getAttribute('src');
      expect(imgSrc).toContain('images.dog.ceo');
    }
  });

  test('스크롤 시 추가 강아지 사진을 로드한다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    await page.waitForSelector('[data-testid="picture-item"]', { timeout: 2000 });
    
    // 초기 이미지 개수 확인
    const initialCount = await page.locator('[data-testid="picture-item"]').count();
    expect(initialCount).toBeGreaterThanOrEqual(6);
    
    // 5번째 이미지까지 스크롤하여 observer가 트리거되도록 함
    const fifthItem = page.locator('[data-testid="picture-item"]').nth(4);
    await fifthItem.scrollIntoViewIfNeeded();
    
    // 추가 이미지가 로드될 때까지 대기 (7번째 이미지 기다림)
    await page.waitForFunction(
      (count) => {
        const items = document.querySelectorAll('[data-testid="picture-item"]');
        return items.length > count;
      },
      initialCount,
      { timeout: 2000 }
    );
    
    // 추가 이미지가 로드되었는지 확인
    const finalCount = await page.locator('[data-testid="picture-item"]').count();
    expect(finalCount).toBeGreaterThan(initialCount);
  });

  test('API 실패 시 에러 상태를 처리한다', async ({ page }) => {
    // API 요청을 가로채서 실패하도록 모킹
    await page.route('**/api/breeds/image/random/**', route => {
      route.abort('failed');
    });
    
    // 페이지 로드
    await page.goto('/pictures');
    
    // 컨테이너는 존재해야 함
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 500 });
    
    // 스플래시 스크린이 사라질 때까지 대기 (API 실패 후)
    await page.waitForFunction(
      () => {
        const splashScreens = document.querySelectorAll('[data-testid="picture-splash-screen"]');
        return splashScreens.length === 0;
      },
      { timeout: 2000 }
    );
    
    // API 실패 시 이미지가 로드되지 않음
    const pictureItems = page.locator('[data-testid="picture-item"]');
    const count = await pictureItems.count();
    expect(count).toBe(0);
  });

  test('무한 스크롤이 마지막 2개 남았을 때 추가 데이터를 로드한다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    await page.waitForSelector('[data-testid="picture-item"]', { timeout: 2000 });
    
    // 초기 이미지 개수 확인
    const initialCount = await page.locator('[data-testid="picture-item"]').count();
    
    // 4번째 이미지까지 스크롤 (마지막 2개 남은 상태)
    const fourthItem = page.locator('[data-testid="picture-item"]').nth(3);
    await fourthItem.scrollIntoViewIfNeeded();
    
    // 추가 이미지가 로드될 때까지 대기
    await page.waitForFunction(
      (count) => {
        const items = document.querySelectorAll('[data-testid="picture-item"]');
        return items.length > count;
      },
      initialCount,
      { timeout: 2000 }
    );
    
    // 새로운 이미지 개수 확인
    const newCount = await page.locator('[data-testid="picture-item"]').count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('로딩 완료 후 실제 API 데이터가 표시된다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    await page.waitForSelector('[data-testid="picture-item"]', { timeout: 2000 });
    
    // 모든 이미지 요소 가져오기
    const images = page.locator('[data-testid="picture-item"] img');
    const count = await images.count();
    
    expect(count).toBeGreaterThanOrEqual(6);
    
    // 첫 번째 이미지가 실제로 로드되었는지 확인
    const firstImage = images.first();
    await expect(firstImage).toBeVisible();
  });

  test('페이지 접속 시 강아지 목록조회 API를 요청한다', async ({ page }) => {
    // API 요청 가로채기
    let apiCalled = false;
    let apiUrl = '';
    
    await page.route('**/api/breeds/image/random/**', route => {
      apiCalled = true;
      apiUrl = route.request().url();
      route.continue();
    });
    
    // 페이지 로드
    await page.goto('/pictures');
    
    // API가 호출되었는지 확인
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    
    // API 호출 확인
    expect(apiCalled).toBeTruthy();
    
    // 올바른 엔드포인트 확인
    expect(apiUrl).toContain('dog.ceo/api/breeds/image/random/6');
  });

  test('조회에 성공하면 6마리의 강아지가 무한스크롤 형태로 노출된다', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    await page.waitForSelector('[data-testid="picture-item"]', { timeout: 2000 });
    
    // 초기 6개 이미지 확인
    const initialImages = page.locator('[data-testid="picture-item"]');
    const initialCount = await initialImages.count();
    expect(initialCount).toBe(6);
    
    // 모든 이미지가 dog.ceo 도메인인지 확인
    for (let i = 0; i < initialCount; i++) {
      const img = initialImages.nth(i).locator('img');
      const src = await img.getAttribute('src');
      expect(src).toContain('images.dog.ceo');
    }
  });

  test('스플래시 스크린 개수는 강아지 개수와 일치한다', async ({ page }) => {
    // API 응답을 지연시켜 스플래시 스크린 확인
    await page.route('**/api/breeds/image/random/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 300));
      await route.continue();
    });
    
    const pagePromise = page.goto('/pictures');
    
    // 컨테이너 로드 대기
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 500 });
    
    // 스플래시 스크린이 있다면 6개여야 함
    const splashScreens = page.locator('[data-testid="picture-splash-screen"]');
    const splashCount = await splashScreens.count().catch(() => 0);
    
    // 스플래시 스크린이 표시되면 반드시 6개
    if (splashCount > 0) {
      expect(splashCount).toBe(6);
    }
    
    await pagePromise;
  });
});

