import { test, expect } from '@playwright/test';

/**
 * DiariesDetail Binding Hook 통합 테스트
 * 
 * 테스트 시나리오:
 * 1. 로컬스토리지에서 일기 데이터를 읽어와 올바르게 바인딩하는지 테스트
 * 2. URL의 동적 파라미터 [id]를 추출하여 해당 일기를 찾는지 테스트
 * 3. 감정 타입이 올바르게 표시되는지 테스트
 * 4. 일기를 찾지 못한 경우 목록 페이지로 리다이렉트되는지 테스트
 */

test.describe('DiariesDetail Binding Hook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('로컬스토리지의 일기 데이터를 올바르게 바인딩한다', async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '바인딩 테스트 제목',
          content: '바인딩 테스트 내용입니다.',
          emotion: 'Happy',
          createdAt: '2024-01-15T09:30:00.000Z',
        },
      ]));
    });
    
    // 상세페이지로 이동
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    // 제목 확인
    await expect(page.locator('h1:has-text("바인딩 테스트 제목")')).toBeVisible();
    
    // 내용 확인
    await expect(page.locator('text=바인딩 테스트 내용입니다.')).toBeVisible();
    
    // 감정 텍스트 확인
    await expect(page.locator('text=행복해요')).toBeVisible();
    
    // 날짜 확인
    await expect(page.locator('text=2024. 01. 15')).toBeVisible();
  });

  test('여러 일기 중에서 올바른 ID의 일기를 찾아 바인딩한다', async ({ page }) => {
    // 로컬스토리지에 여러 일기 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '첫 번째 일기',
          content: '첫 번째 내용',
          emotion: 'Happy',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          title: '두 번째 일기',
          content: '두 번째 내용',
          emotion: 'Sad',
          createdAt: '2024-01-02T00:00:00.000Z',
        },
        {
          id: 3,
          title: '세 번째 일기',
          content: '세 번째 내용',
          emotion: 'Angry',
          createdAt: '2024-01-03T00:00:00.000Z',
        },
      ]));
    });
    
    // ID가 2인 일기 상세페이지로 이동
    await page.goto('/diaries/2');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    // 두 번째 일기의 데이터가 표시되는지 확인
    await expect(page.locator('h1:has-text("두 번째 일기")')).toBeVisible();
    await expect(page.locator('text=두 번째 내용')).toBeVisible();
    await expect(page.locator('text=슬퍼요')).toBeVisible();
    await expect(page.locator('text=2024. 01. 02')).toBeVisible();
  });

  test('감정 타입 Happy를 올바르게 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 10,
          title: 'Happy 테스트',
          content: 'Happy 감정 테스트',
          emotion: 'Happy',
          createdAt: '2024-02-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries/10');
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    await expect(page.locator('text=행복해요')).toBeVisible();
  });

  test('감정 타입 Sad를 올바르게 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 11,
          title: 'Sad 테스트',
          content: 'Sad 감정 테스트',
          emotion: 'Sad',
          createdAt: '2024-02-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries/11');
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    await expect(page.locator('text=슬퍼요')).toBeVisible();
  });

  test('감정 타입 Angry를 올바르게 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 12,
          title: 'Angry 테스트',
          content: 'Angry 감정 테스트',
          emotion: 'Angry',
          createdAt: '2024-02-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries/12');
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    await expect(page.locator('text=화나요')).toBeVisible();
  });

  test('감정 타입 Surprise를 올바르게 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 13,
          title: 'Surprise 테스트',
          content: 'Surprise 감정 테스트',
          emotion: 'Surprise',
          createdAt: '2024-02-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries/13');
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    await expect(page.locator('text=놀랐어요')).toBeVisible();
  });

  test('감정 타입 Etc를 올바르게 표시한다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 14,
          title: 'Etc 테스트',
          content: 'Etc 감정 테스트',
          emotion: 'Etc',
          createdAt: '2024-02-01T00:00:00.000Z',
        },
      ]));
    });
    
    await page.goto('/diaries/14');
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    await expect(page.locator('text=기타')).toBeVisible();
  });

  test('존재하지 않는 ID로 접근 시 목록 페이지로 리다이렉트된다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '존재하는 일기',
          content: '존재하는 내용',
          emotion: 'Happy',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ]));
    });
    
    // 존재하지 않는 ID로 접근
    await page.goto('/diaries/999');
    
    // 목록 페이지로 리다이렉트 확인
    await page.waitForURL('/diaries', { timeout: 500 });
    expect(page.url()).toContain('/diaries');
    expect(page.url()).not.toContain('/diaries/999');
  });

  test('로컬스토리지에 데이터가 없을 때 목록 페이지로 리다이렉트된다', async ({ page }) => {
    // 로컬스토리지가 비어있는 상태에서 상세페이지 접근
    await page.goto('/diaries/1');
    
    // 목록 페이지로 리다이렉트 확인
    await page.waitForURL('/diaries', { timeout: 500 });
    expect(page.url()).toContain('/diaries');
    expect(page.url()).not.toContain('/diaries/1');
  });

  test('날짜 형식이 올바르게 포맷팅된다', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 20,
          title: '날짜 포맷 테스트',
          content: '날짜 포맷 내용',
          emotion: 'Happy',
          createdAt: '2024-12-25T15:30:45.123Z',
        },
      ]));
    });
    
    await page.goto('/diaries/20');
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    // YYYY. MM. DD 형식으로 표시되는지 확인
    await expect(page.locator('text=2024. 12. 25')).toBeVisible();
  });
});


