import { test, expect } from '@playwright/test';

/**
 * DiariesDetail Retrospect Form Hook Integration Tests
 * 
 * 테스트 시나리오:
 * 1. 로컬스토리지에서 회고 데이터를 읽어와 올바르게 저장하는지 테스트
 * 2. 회고 입력 인풋에 텍스트 입력 시 입력 버튼 활성화 테스트
 * 3. 입력 버튼 클릭 시 로컬스토리지에 저장되는지 테스트
 * 4. 기존 회고가 있을 때 새로운 회고가 추가되는지 테스트
 * 5. 등록 완료 후 페이지가 새로고침되는지 테스트
 */

test.describe('DiariesDetail Retrospect Form Hook Integration Tests', () => {
  // 테스트용 다이어리 ID
  const TEST_DIARY_ID = 1;
  
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // 테스트용 사용자 로그인 상태 설정
    await page.evaluate(() => {
      localStorage.setItem('authToken', 'test-token');
    });
    
    // 테스트용 다이어리 데이터 설정
    await page.evaluate((diaryId) => {
      const diaries = [
        {
          id: diaryId,
          title: '테스트 일기',
          content: '테스트 내용입니다.',
          emotion: 'Happy',
          createdAt: '2024-07-12T00:00:00.000Z'
        }
      ];
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, TEST_DIARY_ID);
    
    // 다이어리 상세 페이지 방문
    await page.goto(`/diaries/${TEST_DIARY_ID}`);
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
  });

  test('should disable submit button when retrospect input is empty', async ({ page }) => {
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 입력란이 비어있는지 확인
    await expect(retrospectInput).toHaveValue('');
    
    // 입력 버튼이 비활성화되어 있는지 확인
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit button when retrospect input has text', async ({ page }) => {
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 텍스트 입력
    await retrospectInput.fill('3년이 지나고 다시 보니 이때가 그립다.');
    
    // 입력 버튼이 활성화되어 있는지 확인
    await expect(submitButton).toBeEnabled();
  });

  test('should save retrospect to localStorage when no existing retrospects', async ({ page }) => {
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 테스트 회고 내용
    const retrospectContent = '첫 번째 회고입니다.';
    
    // 텍스트 입력
    await retrospectInput.fill(retrospectContent);
    
    // 입력 버튼 클릭
    await submitButton.click();
    
    // 페이지가 새로고침될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    
    // 로컬스토리지에서 retrospects 가져오기
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : null;
    });
    
    // retrospects가 생성되었는지 확인
    expect(retrospects).not.toBeNull();
    expect(Array.isArray(retrospects)).toBe(true);
    expect(retrospects.length).toBe(1);
    
    // 첫 번째 회고 확인
    expect(retrospects[0].id).toBe(1);
    expect(retrospects[0].content).toBe(retrospectContent);
    expect(retrospects[0].diaryId).toBe(TEST_DIARY_ID);
    expect(retrospects[0].createdAt).toBeTruthy();
  });

  test('should append new retrospect to existing retrospects in localStorage', async ({ page }) => {
    // 기존 retrospects 설정
    await page.evaluate((diaryId) => {
      const existingRetrospects = [
        {
          id: 1,
          content: '기존 회고 1',
          diaryId: diaryId,
          createdAt: '2024-07-12T00:00:00.000Z'
        },
        {
          id: 2,
          content: '기존 회고 2',
          diaryId: diaryId,
          createdAt: '2024-07-13T00:00:00.000Z'
        }
      ];
      localStorage.setItem('retrospects', JSON.stringify(existingRetrospects));
    }, TEST_DIARY_ID);
    
    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
    
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 테스트 회고 내용
    const retrospectContent = '새로운 회고입니다.';
    
    // 텍스트 입력
    await retrospectInput.fill(retrospectContent);
    
    // 입력 버튼 클릭
    await submitButton.click();
    
    // 페이지가 새로고침될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    
    // 로컬스토리지에서 retrospects 가져오기
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : null;
    });
    
    // retrospects가 업데이트되었는지 확인
    expect(retrospects).not.toBeNull();
    expect(Array.isArray(retrospects)).toBe(true);
    expect(retrospects.length).toBe(3);
    
    // 새로운 회고 확인 (id는 가장 큰 id + 1)
    const newRetrospect = retrospects[2];
    expect(newRetrospect.id).toBe(3);
    expect(newRetrospect.content).toBe(retrospectContent);
    expect(newRetrospect.diaryId).toBe(TEST_DIARY_ID);
    expect(newRetrospect.createdAt).toBeTruthy();
  });

  test('should reset input field after successful retrospect submission', async ({ page }) => {
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 텍스트 입력
    await retrospectInput.fill('회고 내용');
    
    // 입력 버튼 클릭
    await submitButton.click();
    
    // 페이지가 새로고침될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
    
    // 입력란이 비어있는지 확인 (새로고침 후)
    const inputAfterSubmit = page.locator('[data-testid="retrospect-input"]');
    await expect(inputAfterSubmit).toHaveValue('');
  });

  test('should save retrospect with correct diaryId matching the current diary', async ({ page }) => {
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 테스트 회고 내용
    const retrospectContent = 'diaryId 검증용 회고입니다.';
    
    // 텍스트 입력
    await retrospectInput.fill(retrospectContent);
    
    // 입력 버튼 클릭
    await submitButton.click();
    
    // 페이지가 새로고침될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    
    // 로컬스토리지에서 retrospects 가져오기
    const retrospect = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      if (!data) return null;
      const retrospects = JSON.parse(data);
      return retrospects[0];
    });
    
    // diaryId가 정확히 매칭되는지 확인
    expect(retrospect).not.toBeNull();
    expect(retrospect.diaryId).toBe(TEST_DIARY_ID);
  });

  test('should save retrospect with ISO format createdAt timestamp', async ({ page }) => {
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 텍스트 입력
    await retrospectInput.fill('타임스탬프 검증용 회고');
    
    // 입력 버튼 클릭 전 시간 기록
    const beforeTime = new Date();
    
    // 입력 버튼 클릭
    await submitButton.click();
    
    // 페이지가 새로고침될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    
    // 입력 버튼 클릭 후 시간 기록
    const afterTime = new Date();
    
    // 로컬스토리지에서 retrospects 가져오기
    const retrospect = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      if (!data) return null;
      const retrospects = JSON.parse(data);
      return retrospects[0];
    });
    
    // createdAt이 ISO 형식인지 확인
    expect(retrospect).not.toBeNull();
    expect(retrospect.createdAt).toBeTruthy();
    
    // ISO 8601 형식 검증 (YYYY-MM-DDTHH:mm:ss.sssZ)
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(retrospect.createdAt).toMatch(isoRegex);
    
    // 저장된 시간이 합리적인 범위 내에 있는지 확인
    const createdAt = new Date(retrospect.createdAt);
    expect(createdAt.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime() - 1000);
    expect(createdAt.getTime()).toBeLessThanOrEqual(afterTime.getTime() + 1000);
  });

  test('should generate sequential IDs correctly when multiple retrospects exist', async ({ page }) => {
    // 비연속적인 ID를 가진 기존 retrospects 설정
    await page.evaluate((diaryId) => {
      const existingRetrospects = [
        {
          id: 1,
          content: '첫 번째',
          diaryId: diaryId,
          createdAt: '2024-07-10T00:00:00.000Z'
        },
        {
          id: 5,
          content: '다섯 번째',
          diaryId: diaryId,
          createdAt: '2024-07-11T00:00:00.000Z'
        },
        {
          id: 3,
          content: '세 번째',
          diaryId: diaryId,
          createdAt: '2024-07-12T00:00:00.000Z'
        }
      ];
      localStorage.setItem('retrospects', JSON.stringify(existingRetrospects));
    }, TEST_DIARY_ID);
    
    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
    
    // 회고 입력란 찾기
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    
    // 입력 버튼 찾기
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    // 텍스트 입력
    await retrospectInput.fill('새로운 회고');
    
    // 입력 버튼 클릭
    await submitButton.click();
    
    // 페이지가 새로고침될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    
    // 로컬스토리지에서 retrospects 가져오기
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : null;
    });
    
    // 가장 큰 ID + 1로 생성되었는지 확인 (5 + 1 = 6)
    expect(retrospects).not.toBeNull();
    expect(retrospects.length).toBe(4);
    const newRetrospect = retrospects[3];
    expect(newRetrospect.id).toBe(6);
  });

  test('should handle multiple diaries with separate retrospects', async ({ page }) => {
    const DIARY_ID_1 = 1;
    const DIARY_ID_2 = 2;
    
    // 로컬스토리지 초기화
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // 여러 다이어리 설정
    await page.evaluate(() => {
      const diaries = [
        {
          id: 1,
          title: '첫 번째 일기',
          content: '첫 번째 내용',
          emotion: 'Happy',
          createdAt: '2024-07-01T00:00:00.000Z'
        },
        {
          id: 2,
          title: '두 번째 일기',
          content: '두 번째 내용',
          emotion: 'Sad',
          createdAt: '2024-07-02T00:00:00.000Z'
        }
      ];
      localStorage.setItem('diaries', JSON.stringify(diaries));
      
      // 첫 번째 다이어리에 대한 회고
      const retrospects = [
        {
          id: 1,
          content: '첫 번째 다이어리의 회고',
          diaryId: 1,
          createdAt: '2024-07-10T00:00:00.000Z'
        }
      ];
      localStorage.setItem('retrospects', JSON.stringify(retrospects));
    });
    
    // 두 번째 다이어리 페이지로 이동
    await page.goto(`/diaries/${DIARY_ID_2}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
    
    // 회고 입력
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    
    await retrospectInput.fill('두 번째 다이어리의 회고');
    await submitButton.click();
    
    // 페이지가 새로고침될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    
    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : null;
    });
    
    // 두 개의 회고가 있고, 각각 올바른 diaryId를 가지는지 확인
    expect(retrospects).not.toBeNull();
    expect(retrospects.length).toBe(2);
    
    const retrospect1 = retrospects.find((r: { diaryId: number }) => r.diaryId === DIARY_ID_1);
    const retrospect2 = retrospects.find((r: { diaryId: number }) => r.diaryId === DIARY_ID_2);
    
    expect(retrospect1).toBeDefined();
    expect(retrospect1.content).toBe('첫 번째 다이어리의 회고');
    
    expect(retrospect2).toBeDefined();
    expect(retrospect2.content).toBe('두 번째 다이어리의 회고');
    expect(retrospect2.diaryId).toBe(DIARY_ID_2);
  });
});

