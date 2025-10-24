import { test, expect } from '@playwright/test';

/**
 * Area Hook 테스트
 * URL 경로에 따른 영역 노출 여부를 테스트합니다.
 */
test.describe('Area Hook Tests', () => {
  
  test.describe('Header 영역 노출 테스트', () => {
    test('일기 목록 페이지에서 header 영역이 노출되어야 함', async ({ page }) => {
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
    });

    // test.skip('사진 목록 페이지에서 header 영역이 노출되어야 함 - SKIP', async ({ page }) => {
    //   // /pictures는 테스트 skip 대상
    //   await page.goto('/pictures');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const header = page.locator('header');
    //   await expect(header).toBeVisible();
    // });

    // test.skip('로그인 페이지에서 header 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/login은 테스트 skip 대상
    //   await page.goto('/auth/login');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const header = page.locator('header');
    //   await expect(header).not.toBeVisible();
    // });

    // test.skip('회원가입 페이지에서 header 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/signup은 테스트 skip 대상
    //   await page.goto('/auth/signup');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const header = page.locator('header');
    //   await expect(header).not.toBeVisible();
    // });
  });

  test.describe('Logo 영역 노출 테스트', () => {
    test('일기 목록 페이지에서 logo가 노출되어야 함', async ({ page }) => {
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      const logo = page.locator('[data-testid="layout-logo"]');
      await expect(logo).toBeVisible();
    });

    // test.skip('사진 목록 페이지에서 logo가 노출되어야 함 - SKIP', async ({ page }) => {
    //   // /pictures는 테스트 skip 대상
    //   await page.goto('/pictures');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const logo = page.locator('[data-testid="layout-logo"]');
    //   await expect(logo).toBeVisible();
    // });

    // test.skip('로그인 페이지에서 logo가 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/login은 테스트 skip 대상
    //   await page.goto('/auth/login');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const logo = page.locator('[data-testid="layout-logo"]');
    //   await expect(logo).not.toBeVisible();
    // });
  });

  test.describe('Banner 영역 노출 테스트', () => {
    test('일기 목록 페이지에서 banner 영역이 노출되어야 함', async ({ page }) => {
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      const banner = page.locator('section[class*="banner"]');
      await expect(banner).toBeVisible();
    });

    // test.skip('사진 목록 페이지에서 banner 영역이 노출되어야 함 - SKIP', async ({ page }) => {
    //   // /pictures는 테스트 skip 대상
    //   await page.goto('/pictures');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const banner = page.locator('section[class*="banner"]');
    //   await expect(banner).toBeVisible();
    // });

    // test.skip('로그인 페이지에서 banner 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/login은 테스트 skip 대상
    //   await page.goto('/auth/login');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const banner = page.locator('section[class*="banner"]');
    //   await expect(banner).not.toBeVisible();
    // });

    // test.skip('회원가입 페이지에서 banner 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/signup은 테스트 skip 대상
    //   await page.goto('/auth/signup');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const banner = page.locator('section[class*="banner"]');
    //   await expect(banner).not.toBeVisible();
    // });
  });

  test.describe('Navigation 영역 노출 테스트', () => {
    test('일기 목록 페이지에서 navigation 영역이 노출되어야 함', async ({ page }) => {
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      const navigation = page.locator('nav');
      await expect(navigation).toBeVisible();
    });

    // test.skip('사진 목록 페이지에서 navigation 영역이 노출되어야 함 - SKIP', async ({ page }) => {
    //   // /pictures는 테스트 skip 대상
    //   await page.goto('/pictures');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const navigation = page.locator('nav');
    //   await expect(navigation).toBeVisible();
    // });

    // test.skip('로그인 페이지에서 navigation 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/login은 테스트 skip 대상
    //   await page.goto('/auth/login');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const navigation = page.locator('nav');
    //   await expect(navigation).not.toBeVisible();
    // });

    // test.skip('회원가입 페이지에서 navigation 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/signup은 테스트 skip 대상
    //   await page.goto('/auth/signup');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const navigation = page.locator('nav');
    //   await expect(navigation).not.toBeVisible();
    // });
  });

  test.describe('Footer 영역 노출 테스트', () => {
    test('일기 목록 페이지에서 footer 영역이 노출되어야 함', async ({ page }) => {
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    // test.skip('사진 목록 페이지에서 footer 영역이 노출되어야 함 - SKIP', async ({ page }) => {
    //   // /pictures는 테스트 skip 대상
    //   await page.goto('/pictures');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const footer = page.locator('footer');
    //   await expect(footer).toBeVisible();
    // });

    // test.skip('로그인 페이지에서 footer 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/login은 테스트 skip 대상
    //   await page.goto('/auth/login');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const footer = page.locator('footer');
    //   await expect(footer).not.toBeVisible();
    // });

    // test.skip('회원가입 페이지에서 footer 영역이 숨겨져야 함 - SKIP', async ({ page }) => {
    //   // /auth/signup은 테스트 skip 대상
    //   await page.goto('/auth/signup');
    //   await page.waitForSelector('[data-testid="layout-container"]');
    //   
    //   const footer = page.locator('footer');
    //   await expect(footer).not.toBeVisible();
    // });
  });

  test.describe('일기 상세 페이지 영역 노출 테스트', () => {
    test('일기 상세 페이지에서 header와 footer만 노출되어야 함', async ({ page }) => {
      await page.goto('/diaries/1');
      await page.waitForSelector('[data-testid="layout-container"]');
      
      // Header와 Footer는 노출되어야 함
      const header = page.locator('header');
      const footer = page.locator('footer');
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();
      
      // Banner와 Navigation은 숨겨져야 함
      const banner = page.locator('section[class*="banner"]');
      const navigation = page.locator('nav');
      await expect(banner).not.toBeVisible();
      await expect(navigation).not.toBeVisible();
    });
  });
});
