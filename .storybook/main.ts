import type { StorybookConfig } from '@storybook/nextjs';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  
  webpackFinal: async (config: any, { configType }: any) => {
    // 경로 별칭 설정
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    // Next.js webpack 충돌 해결을 위한 설정
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Storybook이 Next.js 이미지를 올바르게 처리하도록 설정
    const imageRule = config.module?.rules?.find((rule: any) => {
      const test = rule.test;
      if (!test) return false;
      return test.test('.svg') || test.test('.png') || test.test('.jpg');
    });

    if (imageRule) {
      imageRule.exclude = /node_modules/;
    }

    return config;
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  core: {
    disableTelemetry: true,
  },
};

export default config;
