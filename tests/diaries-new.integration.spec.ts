import { test, expect } from '@playwright/test';

/**
 * DiariesNew 컴포넌트 통합 테스트
 * 
 * 테스트 조건:
 * - timeout: 500ms 미만
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 금지
 * - /pictures 경로는 skip
 */
test.describe('DiariesNew Integration Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // temp 페이지로 이동하여 DiariesNew 컴포넌트 테스트
    await page.goto('/temp');
    
    // 페이지 로드 완료 대기 (data-testid 방식)
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]', { timeout: 500 });
  });

  test('전체 사용자 플로우 테스트', async ({ page }) => {
    // 1. 페이지 로드 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    
    // 2. 감정 선택
    await page.locator('[data-testid="emotion-option-Sad"]').click();
    await expect(page.locator('[data-testid="emotion-option-Sad"]')).toBeChecked();
    
    // 3. 제목 입력
    await page.locator('[data-testid="diaries-new-title-input"]').fill('오늘의 기분');
    await expect(page.locator('[data-testid="diaries-new-title-input"]')).toHaveValue('오늘의 기분');
    
    // 4. 내용 입력
    await page.locator('[data-testid="diaries-new-content-textarea"]').fill('오늘은 정말 슬펐다.');
    await expect(page.locator('[data-testid="diaries-new-content-textarea"]')).toHaveValue('오늘은 정말 슬펐다.');
    
    // 5. 콘솔 로그 수집
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    // 6. 등록하기 버튼 클릭
    await page.locator('[data-testid="diaries-new-submit-button"]').click();
    
    // 7. 제출된 데이터 확인
    await expect(consoleLogs).toContain('등록하기');
    const submitLog = consoleLogs.find(log => log.includes('등록하기'));
    expect(submitLog).toContain('Sad');
    expect(submitLog).toContain('오늘의 기분');
    expect(submitLog).toContain('오늘은 정말 슬펐다.');
  });

  test('감정 변경 플로우 테스트', async ({ page }) => {
    // 초기 상태 확인 (행복해요가 선택됨)
    await expect(page.locator('[data-testid="emotion-option-Happy"]')).toBeChecked();
    
    // 감정을 순차적으로 변경
    const emotions = ['Sad', 'Surprise', 'Angry', 'Etc'];
    
    for (const emotion of emotions) {
      await page.locator(`[data-testid="emotion-option-${emotion}"]`).click();
      await expect(page.locator(`[data-testid="emotion-option-${emotion}"]`)).toBeChecked();
      
      // 이전 감정이 선택 해제되었는지 확인
      for (const otherEmotion of emotions) {
        if (otherEmotion !== emotion) {
          await expect(page.locator(`[data-testid="emotion-option-${otherEmotion}"]`)).not.toBeChecked();
        }
      }
    }
  });

  test('폼 유효성 검사 테스트', async ({ page }) => {
    // 빈 폼으로 제출 시도
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    await page.locator('[data-testid="diaries-new-submit-button"]').click();
    
    // 빈 데이터로 제출되었는지 확인
    const submitLog = consoleLogs.find(log => log.includes('등록하기'));
    expect(submitLog).toContain('Happy'); // 기본 선택된 감정
    expect(submitLog).toContain('""'); // 빈 제목
    expect(submitLog).toContain('""'); // 빈 내용
  });

  test('키보드 접근성 테스트', async ({ page }) => {
    // Tab 키로 네비게이션
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // 현재 포커스된 요소 확인
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 라디오 버튼 키보드 선택
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press(' ');
    
    // 선택된 감정 확인
    await expect(page.locator('[data-testid="emotion-option-Surprise"]')).toBeChecked();
    
    // Tab으로 다음 요소로 이동
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // 제목 입력 필드에 포커스
    const titleInput = page.locator('[data-testid="diaries-new-title-input"]');
    await expect(titleInput).toBeFocused();
    
    // 제목 입력
    await page.keyboard.type('키보드로 입력한 제목');
    await expect(titleInput).toHaveValue('키보드로 입력한 제목');
  });

  test('반응형 레이아웃 테스트', async ({ page }) => {
    // 다양한 뷰포트에서 테스트
    const viewports = [
      { width: 320, height: 568, name: 'Mobile Small' },
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1200, height: 800, name: 'Desktop' },
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // 컴포넌트가 보이는지 확인
      await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
      
      // 모든 주요 요소가 보이는지 확인
      await expect(page.locator('[data-testid="diaries-new-title"]')).toBeVisible();
      await expect(page.locator('[data-testid="diaries-new-emotion-box"]')).toBeVisible();
      await expect(page.locator('[data-testid="diaries-new-title-section"]')).toBeVisible();
      await expect(page.locator('[data-testid="diaries-new-content-section"]')).toBeVisible();
      await expect(page.locator('[data-testid="diaries-new-footer"]')).toBeVisible();
    }
  });

  test('성능 테스트', async ({ page }) => {
    // 페이지 로드 시간 측정
    const startTime = Date.now();
    await page.goto('/temp');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]', { timeout: 500 });
    const loadTime = Date.now() - startTime;
    
    // 로드 시간이 500ms 미만인지 확인
    expect(loadTime).toBeLessThan(500);
    
    // 컴포넌트 렌더링 시간 측정
    const renderStartTime = Date.now();
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    const renderTime = Date.now() - renderStartTime;
    
    // 렌더링 시간이 100ms 미만인지 확인
    expect(renderTime).toBeLessThan(100);
  });

  test('에러 처리 테스트', async ({ page }) => {
    // 잘못된 데이터 입력 시도
    await page.locator('[data-testid="diaries-new-title-input"]').fill('a'.repeat(1000)); // 매우 긴 제목
    await page.locator('[data-testid="diaries-new-content-textarea"]').fill('b'.repeat(10000)); // 매우 긴 내용
    
    // 컴포넌트가 여전히 작동하는지 확인
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    
    // 버튼이 여전히 클릭 가능한지 확인
    await expect(page.locator('[data-testid="diaries-new-submit-button"]')).toBeEnabled();
    await expect(page.locator('[data-testid="diaries-new-close-button"]')).toBeEnabled();
  });
});
