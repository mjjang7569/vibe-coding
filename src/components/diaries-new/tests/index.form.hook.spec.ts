import { test, expect } from '@playwright/test';

/**
 * DiariesNew Form Hook 통합 테스트
 * 
 * 테스트 시나리오:
 * 1. 폼 검증 기능 테스트 (모든 필드 입력 시 버튼 활성화)
 * 2. 로컬스토리지 저장 기능 테스트 (첫 등록, 추가 등록)
 * 3. 등록완료 모달 표시 테스트
 * 4. 상세페이지 이동 및 모달 닫힘 테스트
 * 5. 필드별 검증 실패 테스트
 */

test.describe('DiariesNew Form Hook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('모든 필드가 입력되면 등록하기 버튼이 활성화된다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-list"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-new-button"]');
    
    // 모달이 열릴 때까지 대기
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');
    
    // 초기 상태: 등록하기 버튼 비활성화
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeDisabled();
    
    // 제목 입력
    await page.fill('[data-testid="diaries-new-title-input"]', '테스트 제목');
    
    // 내용 입력
    await page.fill('[data-testid="diaries-new-content-textarea"]', '테스트 내용');
    
    // 모든 필드 입력 후: 등록하기 버튼 활성화
    await expect(submitButton).toBeEnabled();
  });

  test('등록하기 버튼 클릭 시 로컬스토리지에 데이터가 저장된다 (첫 등록)', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-list"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-new-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');
    
    // 감정 선택 (기본값 Happy)
    await page.click('[data-testid="emotion-option-Sad"]');
    
    // 제목 입력
    await page.fill('[data-testid="diaries-new-title-input"]', '첫 번째 일기');
    
    // 내용 입력
    await page.fill('[data-testid="diaries-new-content-textarea"]', '첫 번째 일기 내용입니다.');
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });
    
    expect(diaries).toBeTruthy();
    expect(diaries).toHaveLength(1);
    expect(diaries[0]).toMatchObject({
      id: 1,
      title: '첫 번째 일기',
      content: '첫 번째 일기 내용입니다.',
      emotion: 'Sad',
    });
    expect(diaries[0].createdAt).toBeTruthy();
  });

  test('등록하기 버튼 클릭 시 기존 데이터에 추가로 저장된다', async ({ page }) => {
    // 기존 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '기존 일기',
          content: '기존 일기 내용',
          emotion: 'Happy',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ]));
    });
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-list"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-new-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');
    
    // 감정 선택
    await page.click('[data-testid="emotion-option-Angry"]');
    
    // 제목 입력
    await page.fill('[data-testid="diaries-new-title-input"]', '두 번째 일기');
    
    // 내용 입력
    await page.fill('[data-testid="diaries-new-content-textarea"]', '두 번째 일기 내용입니다.');
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });
    
    expect(diaries).toBeTruthy();
    expect(diaries).toHaveLength(2);
    expect(diaries[1]).toMatchObject({
      id: 2,
      title: '두 번째 일기',
      content: '두 번째 일기 내용입니다.',
      emotion: 'Angry',
    });
  });

  test('등록 완료 후 등록완료 모달이 표시된다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-list"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-new-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');
    
    // 제목 입력
    await page.fill('[data-testid="diaries-new-title-input"]', '테스트 제목');
    
    // 내용 입력
    await page.fill('[data-testid="diaries-new-content-textarea"]', '테스트 내용');
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');
    
    // 등록완료 모달 확인 (짧은 대기 시간)
    await page.waitForSelector('text=등록 완료', { timeout: 400 });
    await expect(page.locator('text=등록이 완료 되었습니다.')).toBeVisible();
  });

  test('등록완료 모달의 확인 버튼 클릭 시 상세페이지로 이동하고 모든 모달이 닫힌다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-list"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-new-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');
    
    // 감정 선택
    await page.click('[data-testid="emotion-option-Happy"]');
    
    // 제목 입력
    await page.fill('[data-testid="diaries-new-title-input"]', '테스트 제목');
    
    // 내용 입력
    await page.fill('[data-testid="diaries-new-content-textarea"]', '테스트 내용');
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');
    
    // 등록완료 모달이 표시될 때까지 대기
    await page.waitForSelector('text=등록 완료');
    
    // 등록완료 모달의 확인 버튼 클릭
    const confirmButton = page.locator('button:has-text("확인")').last();
    await confirmButton.click();
    
    // 상세페이지로 이동 확인
    await page.waitForURL(/\/diaries\/\d+/);
    expect(page.url()).toMatch(/\/diaries\/\d+$/);
    
    // 모든 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).not.toBeVisible();
    
    // 상세페이지에 데이터가 표시되는지 확인
    await expect(page.locator('h1:has-text("테스트 제목")')).toBeVisible();
    await expect(page.locator('text=테스트 내용')).toBeVisible();
    await expect(page.locator('text=행복해요')).toBeVisible();
  });

  test('제목이 비어있으면 등록하기 버튼이 비활성화된다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-list"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-new-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');
    
    // 내용만 입력
    await page.fill('[data-testid="diaries-new-content-textarea"]', '테스트 내용');
    
    // 등록하기 버튼 비활성화 확인
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('내용이 비어있으면 등록하기 버튼이 비활성화된다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-list"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-new-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');
    
    // 제목만 입력
    await page.fill('[data-testid="diaries-new-title-input"]', '테스트 제목');
    
    // 등록하기 버튼 비활성화 확인
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('상세페이지에서 로컬스토리지의 데이터를 정확히 표시한다', async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 100,
          title: '상세페이지 테스트 제목',
          content: '상세페이지 테스트 내용입니다.',
          emotion: 'Surprise',
          createdAt: '2024-12-25T10:30:00.000Z',
        },
      ]));
    });
    
    // 상세페이지로 직접 이동
    await page.goto('/diaries/100');
    
    // 데이터가 정확히 표시되는지 확인
    await expect(page.locator('h1:has-text("상세페이지 테스트 제목")')).toBeVisible();
    await expect(page.locator('text=상세페이지 테스트 내용입니다.')).toBeVisible();
    await expect(page.locator('text=놀랐어요')).toBeVisible();
    await expect(page.locator('text=2024. 12. 25')).toBeVisible();
  });
});

