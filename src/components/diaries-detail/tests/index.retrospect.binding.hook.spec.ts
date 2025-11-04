import { test, expect } from '@playwright/test';

/**
 * useRetrospectBinding Hook 테스트
 * 
 * 요구사항:
 * - 로컬스토리지에서 retrospects 데이터를 읽어옴
 * - diaryId가 페이지 [id]와 일치하는 회고 항목들만 필터링
 * - 실제 데이터 사용 (Mock 금지)
 * - 로컬스토리지 모킹 금지
 */

test.describe('useRetrospectBinding Hook', () => {
  const testDiaryId = 1;
  
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/');
    
    // 실제 데이터 구조에 맞게 로컬스토리지에 저장
    await page.evaluate(() => {
      localStorage.setItem('retrospects', JSON.stringify([
        {
          id: 1,
          content: '3년이 지나고 다시 보니 이때가 그립다.',
          diaryId: 1,
          createdAt: '2024-09-24T00:00:00.000Z'
        },
        {
          id: 2,
          content: '다시 돌아보니 좋은 경험이었다.',
          diaryId: 1,
          createdAt: '2024-09-25T00:00:00.000Z'
        },
        {
          id: 3,
          content: '다른 일기의 회고입니다.',
          diaryId: 2,
          createdAt: '2024-09-26T00:00:00.000Z'
        }
      ]));
      
      // 일기 데이터도 설정
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '테스트 일기',
          content: '테스트 내용입니다.',
          emotion: 'happy',
          createdAt: '2024-07-12T00:00:00.000Z'
        }
      ]));
    });
  });

  test('diaryId가 일치하는 회고 항목들을 필터링하여 표시해야 함', async ({ page }) => {
    // /diaries/[id] 페이지 방문
    await page.goto(`/diaries/${testDiaryId}`);
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    // diaryId가 1인 회고 항목들만 표시되는지 확인
    const retrospectItems = await page.locator('[data-testid^="retrospect-item-"]').all();
    
    // diaryId가 1인 회고는 2개여야 함
    expect(retrospectItems.length).toBe(2);
    
    // 첫 번째 회고 내용 확인
    const firstContent = await page.locator('[data-testid="retrospect-content-1"]').textContent();
    expect(firstContent).toBe('3년이 지나고 다시 보니 이때가 그립다.');
    
    // 두 번째 회고 내용 확인
    const secondContent = await page.locator('[data-testid="retrospect-content-2"]').textContent();
    expect(secondContent).toBe('다시 돌아보니 좋은 경험이었다.');
  });

  test('회고 날짜가 올바르게 포맷되어 표시되어야 함', async ({ page }) => {
    // /diaries/[id] 페이지 방문
    await page.goto(`/diaries/${testDiaryId}`);
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    // 첫 번째 회고 날짜 확인 (포맷: YYYY. MM. DD 또는 [YYYY. MM. DD])
    const firstDate = await page.locator('[data-testid="retrospect-date-1"]').textContent();
    expect(firstDate).toContain('2024');
    expect(firstDate).toContain('09');
    expect(firstDate).toContain('24');
  });

  test('해당 diaryId에 회고가 없을 경우 빈 목록을 표시해야 함', async ({ page }) => {
    // 회고가 없는 diaryId로 테스트
    const emptyDiaryId = 999;
    
    // 일기 데이터 추가
    await page.goto('/');
    await page.evaluate((id) => {
      const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
      diaries.push({
        id: id,
        title: '회고가 없는 일기',
        content: '내용입니다.',
        emotion: 'happy',
        createdAt: '2024-07-13T00:00:00.000Z'
      });
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, emptyDiaryId);
    
    await page.goto(`/diaries/${emptyDiaryId}`);
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    // 회고 항목이 없어야 함
    const retrospectItems = await page.locator('[data-testid^="retrospect-item-"]').all();
    expect(retrospectItems.length).toBe(0);
  });

  test('로컬스토리지에 retrospects가 없을 경우 빈 목록을 표시해야 함', async ({ page }) => {
    // 로컬스토리지의 retrospects 제거
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('retrospects');
    });
    
    await page.goto(`/diaries/${testDiaryId}`);
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    // 회고 항목이 없어야 함
    const retrospectItems = await page.locator('[data-testid^="retrospect-item-"]').all();
    expect(retrospectItems.length).toBe(0);
  });
});

