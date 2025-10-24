import { test, expect } from '@playwright/test';

/**
 * DiariesNew 컴포넌트 테스트
 * 
 * 테스트 조건:
 * - timeout: 500ms 미만
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 금지
 * - /pictures 경로는 skip
 */
test.describe('DiariesNew Component Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // temp 페이지로 이동하여 DiariesNew 컴포넌트 테스트
    await page.goto('/temp');
    
    // 페이지 로드 완료 대기 (data-testid 방식)
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]', { timeout: 500 });
  });

  test('컴포넌트 렌더링 확인', async ({ page }) => {
    // Wrapper 영역 확인
    const wrapper = page.locator('[data-testid="diaries-new-wrapper"]');
    await expect(wrapper).toBeVisible();
    
    // Header 영역 확인
    const header = page.locator('[data-testid="diaries-new-header"]');
    await expect(header).toBeVisible();
    
    const title = page.locator('[data-testid="diaries-new-title"]');
    await expect(title).toHaveText('일기 쓰기');
  });

  test('감정 선택 기능 테스트', async ({ page }) => {
    // 감정 선택 영역 확인
    const emotionBox = page.locator('[data-testid="diaries-new-emotion-box"]');
    await expect(emotionBox).toBeVisible();
    
    // 감정 제목 확인
    const emotionTitle = page.locator('[data-testid="diaries-new-emotion-title"]');
    await expect(emotionTitle).toHaveText('오늘 기분은 어땟나요?');
    
    // 모든 감정 옵션 확인
    const emotionOptions = page.locator('[data-testid^="emotion-option-"]');
    await expect(emotionOptions).toHaveCount(5);
    
    // 기본 선택 상태 확인 (행복해요)
    const happyOption = page.locator('[data-testid="emotion-option-Happy"]');
    await expect(happyOption).toBeChecked();
    
    // 다른 감정 선택 테스트
    const sadOption = page.locator('[data-testid="emotion-option-Sad"]');
    await sadOption.click();
    await expect(sadOption).toBeChecked();
    await expect(happyOption).not.toBeChecked();
  });

  test('제목 입력 기능 테스트', async ({ page }) => {
    // 제목 입력 영역 확인
    const titleSection = page.locator('[data-testid="diaries-new-title-section"]');
    await expect(titleSection).toBeVisible();
    
    // 제목 라벨 확인
    const titleLabel = page.locator('[data-testid="diaries-new-title-label"]');
    await expect(titleLabel).toHaveText('제목');
    
    // 제목 입력 필드 확인
    const titleInput = page.locator('[data-testid="diaries-new-title-input"]');
    await expect(titleInput).toBeVisible();
    await expect(titleInput).toHaveAttribute('placeholder', '제목을 입력해 주세요.');
    
    // 제목 입력 테스트
    await titleInput.fill('오늘의 일기');
    await expect(titleInput).toHaveValue('오늘의 일기');
  });

  test('내용 입력 기능 테스트', async ({ page }) => {
    // 내용 입력 영역 확인
    const contentSection = page.locator('[data-testid="diaries-new-content-section"]');
    await expect(contentSection).toBeVisible();
    
    // 내용 라벨 확인
    const contentLabel = page.locator('[data-testid="diaries-new-content-label"]');
    await expect(contentLabel).toHaveText('내용');
    
    // 내용 입력 필드 확인
    const contentTextarea = page.locator('[data-testid="diaries-new-content-textarea"]');
    await expect(contentTextarea).toBeVisible();
    await expect(contentTextarea).toHaveAttribute('placeholder', '내용을 입력해 주세요.');
    
    // 내용 입력 테스트
    const testContent = '오늘은 정말 좋은 하루였다.';
    await contentTextarea.fill(testContent);
    await expect(contentTextarea).toHaveValue(testContent);
  });

  test('버튼 기능 테스트', async ({ page }) => {
    // Footer 영역 확인
    const footer = page.locator('[data-testid="diaries-new-footer"]');
    await expect(footer).toBeVisible();
    
    // 닫기 버튼 확인
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await expect(closeButton).toBeVisible();
    await expect(closeButton).toHaveText('닫기');
    
    // 등록하기 버튼 확인
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('등록하기');
    
    // 버튼 클릭 테스트 (콘솔 로그 확인)
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    await closeButton.click();
    await expect(consoleLogs).toContain('닫기');
    
    await submitButton.click();
    await expect(consoleLogs).toContain('등록하기');
  });

  test('전체 폼 제출 테스트', async ({ page }) => {
    // 폼 데이터 입력
    await page.locator('[data-testid="emotion-option-Sad"]').click();
    await page.locator('[data-testid="diaries-new-title-input"]').fill('슬픈 하루');
    await page.locator('[data-testid="diaries-new-content-textarea"]').fill('오늘은 정말 슬펐다.');
    
    // 콘솔 로그 수집
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    // 등록하기 버튼 클릭
    await page.locator('[data-testid="diaries-new-submit-button"]').click();
    
    // 제출된 데이터 확인
    await expect(consoleLogs).toContain('등록하기');
    const submitLog = consoleLogs.find(log => log.includes('등록하기'));
    expect(submitLog).toContain('selectedEmotion');
    expect(submitLog).toContain('title');
    expect(submitLog).toContain('content');
  });

  test('반응형 디자인 테스트', async ({ page }) => {
    // 데스크톱 뷰포트 확인
    await page.setViewportSize({ width: 1200, height: 800 });
    const wrapper = page.locator('[data-testid="diaries-new-wrapper"]');
    await expect(wrapper).toBeVisible();
    
    // 모바일 뷰포트 테스트
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(wrapper).toBeVisible();
    
    // 태블릿 뷰포트 테스트
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(wrapper).toBeVisible();
  });

  test('접근성 테스트', async ({ page }) => {
    // 키보드 네비게이션 테스트
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // 포커스 상태 확인
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 라디오 버튼 키보드 선택 테스트
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press(' ');
    
    // 선택된 감정 확인
    const selectedEmotion = page.locator('[data-testid="emotion-option-Surprise"]');
    await expect(selectedEmotion).toBeChecked();
  });

  test('스타일링 테스트', async ({ page }) => {
    // Wrapper 스타일 확인
    const wrapper = page.locator('[data-testid="diaries-new-wrapper"]');
    await expect(wrapper).toHaveCSS('width', '640px');
    await expect(wrapper).toHaveCSS('height', '560px');
    await expect(wrapper).toHaveCSS('border-radius', '24px');
    
    // 버튼 스타일 확인
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await expect(closeButton).toHaveCSS('width', '104px');
    await expect(closeButton).toHaveCSS('height', '48px');
    await expect(closeButton).toHaveCSS('border-radius', '8px');
  });
});
