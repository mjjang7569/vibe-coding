import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 설정
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './',
  testMatch: [
    '**/tests/**/*.spec.ts',
    '**/src/components/**/tests/**/*.spec.ts',
  ],
  
  /* 병렬로 실행할 테스트 수 */
  fullyParallel: true,
  
  /* CI에서 실패한 테스트만 재시도 */
  forbidOnly: !!process.env.CI,
  
  /* CI에서 재시도 설정 */
  retries: process.env.CI ? 2 : 0,
  
  /* CI에서는 병렬 처리 없이, 로컬에서는 병렬 처리 */
  workers: process.env.CI ? 1 : undefined,
  
  /* 리포터 설정 */
  reporter: 'html',
  
  /* 모든 테스트에 공유되는 설정 */
  use: {
    /* 액션 실패 시 스크린샷과 같은 추가 정보 수집 */
    // trace: 'on-first-retry',
    
    /* Base URL - Next.js 개발 서버 */
    baseURL: 'http://localhost:3000',
  },

  /* 테스트 실행 전 개발 서버 시작 */
  // 수동으로 개발 서버를 실행한 상태에서 테스트 실행
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    env:{
      NEXT_PUBLIC_TEST_ENV :'test'
    }
  },

  /* 다양한 브라우저에서 테스트 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 모바일 뷰포트 테스트 */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});

