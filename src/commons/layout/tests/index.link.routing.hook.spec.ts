import { test, expect } from '@playwright/test';

test.describe('Layout 링크 및 라우팅 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 일기 목록 페이지로 이동
    await page.goto('/diaries', { waitUntil: 'domcontentloaded' });
    // 페이지 로드 대기 (data-testid 사용, timeout 설정 안 함)
    await page.waitForSelector('[data-testid="layout-container"]');
  });

  test('로고 클릭 시 일기 목록 페이지로 이동', async ({ page }) => {
    // 일기 상세 페이지가 있다면 해당 페이지로 먼저 이동 (현재는 skip)
    // 로고 클릭
    await page.click('[data-testid="layout-logo"]');
    
    // URL 확인
    await expect(page).toHaveURL('/diaries');
    
    // 페이지 로드 확인 (timeout 설정 안 함)
    await page.waitForSelector('[data-testid="layout-container"]');
  });

  test('일기보관함 탭 클릭 시 일기 목록 페이지로 이동', async ({ page }) => {
    // 이미 일기 목록 페이지에 있으므로, 탭이 클릭 가능한지만 확인
    const diariesTab = page.locator('[data-testid="nav-tab-diaries"]');
    await expect(diariesTab).toBeVisible();
    
    // 탭 클릭 (페이지 새로고침 없이 동작)
    await diariesTab.click();
    
    // URL이 여전히 /diaries인지 확인
    await expect(page).toHaveURL('/diaries');
  });

  test.skip('사진보관함 탭 클릭 시 사진 목록 페이지로 이동 - SKIP', async ({ page }) => {
    // /pictures는 테스트 skip
    await page.click('[data-testid="nav-tab-pictures"]');
    await expect(page).toHaveURL('/pictures');
  });

  test('일기 목록 페이지에서 일기보관함 탭이 활성화 상태', async ({ page }) => {
    // 일기 목록 페이지에 있는지 확인
    await expect(page).toHaveURL('/diaries');
    
    // 일기보관함 탭이 active 클래스를 가지고 있는지 확인
    const diariesTab = page.locator('[data-testid="nav-tab-diaries"]');
    const classValue = await diariesTab.getAttribute('class');
    expect(classValue).toContain('navTabActive');
  });

  test.skip('사진 목록 페이지에서 사진보관함 탭이 활성화 상태 - SKIP', async () => {
    // /pictures는 테스트 skip
  });

  test.skip('일기보관함에서 사진보관함으로 이동 시 활성 탭이 변경됨 - SKIP', async () => {
    // /pictures는 테스트 skip
  });

  test('로고에 cursor: pointer 스타일이 적용되어 있음', async ({ page }) => {
    const logo = page.locator('[data-testid="layout-logo"]');
    const cursor = await logo.evaluate((el) => 
      window.getComputedStyle(el).cursor
    );
    expect(cursor).toBe('pointer');
  });

  test('네비게이션 탭에 cursor: pointer 스타일이 적용되어 있음', async ({ page }) => {
    const diariesTab = page.locator('[data-testid="nav-tab-diaries"]');
    const cursor = await diariesTab.evaluate((el) => 
      window.getComputedStyle(el).cursor
    );
    expect(cursor).toBe('pointer');
  });
});

