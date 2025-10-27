import { test, expect } from '@playwright/test';

/**
 * Diaries Binding Hook 통합 테스트
 * 
 * 테스트 시나리오:
 * 1. 로컬스토리지에서 일기 목록 데이터를 읽어와 올바르게 바인딩하는지 테스트
 * 2. 감정 타입이 올바르게 표시되는지 테스트
 * 3. 제목이 올바르게 표시되는지 테스트 (긴 제목의 경우 "..."으로 표시)
 * 4. 날짜가 올바르게 포맷팅되어 표시되는지 테스트
 * 5. 데이터가 없을 때 빈 상태를 올바르게 처리하는지 테스트
 */

test.describe('Diaries Binding Hook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('로컬스토리지의 일기 목록 데이터를 올바르게 바인딩한다', async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '첫 번째 일기',
          content: '첫 번째 일기 내용입니다.',
          emotion: 'Happy',
          createdAt: '2024-01-15T09:30:00.000Z',
        },
        {
          id: 2,
          title: '두 번째 일기',
          content: '두 번째 일기 내용입니다.',
          emotion: 'Sad',
          createdAt: '2024-01-16T10:00:00.000Z',
        },
      ]));
    });
    
    // 페이지 새로고침하여 데이터 로드
    await page.goto('/diaries');
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // 첫 번째 일기 확인
    await expect(page.locator('text=첫 번째 일기')).toBeVisible();
    await expect(page.locator('text=행복해요').first()).toBeVisible();
    await expect(page.locator('text=2024. 01. 15').first()).toBeVisible();
    
    // 두 번째 일기 확인
    await expect(page.locator('text=두 번째 일기')).toBeVisible();
    await expect(page.locator('text=슬퍼요').first()).toBeVisible();
    await expect(page.locator('text=2024. 01. 16').first()).toBeVisible();
  });

  test('여러 감정 타입이 올바르게 표시된다', async ({ page }) => {
    // 모든 감정 타입 테스트
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: 'Happy 일기',
          content: '행복한 내용',
          emotion: 'Happy',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          title: 'Sad 일기',
          content: '슬픈 내용',
          emotion: 'Sad',
          createdAt: '2024-01-02T00:00:00.000Z',
        },
        {
          id: 3,
          title: 'Angry 일기',
          content: '화난 내용',
          emotion: 'Angry',
          createdAt: '2024-01-03T00:00:00.000Z',
        },
        {
          id: 4,
          title: 'Surprise 일기',
          content: '놀란 내용',
          emotion: 'Surprise',
          createdAt: '2024-01-04T00:00:00.000Z',
        },
        {
          id: 5,
          title: 'Etc 일기',
          content: '기타 내용',
          emotion: 'Etc',
          createdAt: '2024-01-05T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // 각 감정 라벨 확인
    await expect(page.locator('text=행복해요').first()).toBeVisible();
    await expect(page.locator('text=슬퍼요').first()).toBeVisible();
    await expect(page.locator('text=화나요').first()).toBeVisible();
    await expect(page.locator('text=놀랐어요').first()).toBeVisible();
    await expect(page.locator('text=기타').first()).toBeVisible();
  });

  test('제목이 올바르게 표시된다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '짧은 제목',
          content: '내용',
          emotion: 'Happy',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
          content: '긴 제목 내용',
          emotion: 'Sad',
          createdAt: '2024-01-02T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // 짧은 제목 확인
    await expect(page.locator('text=짧은 제목')).toBeVisible();
    
    // 긴 제목 확인 (일부만 표시될 수 있음)
    const longTitleElement = page.locator('text=/타이틀 영역 입니다/').first();
    await expect(longTitleElement).toBeVisible();
  });

  test('날짜 형식이 올바르게 포맷팅된다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '날짜 테스트',
          content: '날짜 포맷 테스트',
          emotion: 'Happy',
          createdAt: '2024-12-25T15:30:45.123Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // YYYY. MM. DD 형식으로 표시되는지 확인
    await expect(page.locator('text=2024. 12. 25')).toBeVisible();
  });

  test('감정 타입 Happy가 올바른 이미지를 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: 'Happy 테스트',
          content: 'Happy 이미지 테스트',
          emotion: 'Happy',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // 이미지 src 확인
    const image = page.locator('img[alt="행복해요"]').first();
    await expect(image).toBeVisible();
    const src = await image.getAttribute('src');
    expect(src).toContain('emotion-happy-m');
  });

  test('감정 타입 Sad가 올바른 이미지를 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: 'Sad 테스트',
          content: 'Sad 이미지 테스트',
          emotion: 'Sad',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    const image = page.locator('img[alt="슬퍼요"]').first();
    await expect(image).toBeVisible();
    const src = await image.getAttribute('src');
    expect(src).toContain('emotion-sad-m');
  });

  test('감정 타입 Angry가 올바른 이미지를 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: 'Angry 테스트',
          content: 'Angry 이미지 테스트',
          emotion: 'Angry',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    const image = page.locator('img[alt="화나요"]').first();
    await expect(image).toBeVisible();
    const src = await image.getAttribute('src');
    expect(src).toContain('emotion-angry-m');
  });

  test('감정 타입 Surprise가 올바른 이미지를 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: 'Surprise 테스트',
          content: 'Surprise 이미지 테스트',
          emotion: 'Surprise',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    const image = page.locator('img[alt="놀랐어요"]').first();
    await expect(image).toBeVisible();
    const src = await image.getAttribute('src');
    expect(src).toContain('emotion-surprise-m');
  });

  test('감정 타입 Etc가 올바른 이미지를 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: 'Etc 테스트',
          content: 'Etc 이미지 테스트',
          emotion: 'Etc',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    const image = page.locator('img[alt="기타"]').first();
    await expect(image).toBeVisible();
    const src = await image.getAttribute('src');
    expect(src).toContain('emotion-etc-m');
  });

  test('로컬스토리지에 데이터가 없을 때 빈 목록을 표시한다', async ({ page }) => {
    // 로컬스토리지가 비어있는 상태에서 페이지 접근
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // 일기 카드가 없는지 확인
    const diaryCards = page.locator('[class*="diaryCard"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test('빈 배열일 때 빈 목록을 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([]));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // 일기 카드가 없는지 확인
    const diaryCards = page.locator('[class*="diaryCard"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test('다수의 일기가 올바르게 표시된다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      const diaries = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `일기 ${i + 1}`,
        content: `내용 ${i + 1}`,
        emotion: ['Happy', 'Sad', 'Angry', 'Surprise', 'Etc'][i % 5],
        createdAt: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
      }));
      localStorage.setItem('diaries', JSON.stringify(diaries));
    });
    
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diary-category-select"]', { timeout: 500 });
    
    // 첫 번째와 마지막 일기 확인
    await expect(page.locator('text=일기 1').first()).toBeVisible();
    await expect(page.locator('text=일기 12').first()).toBeVisible();
  });
});

