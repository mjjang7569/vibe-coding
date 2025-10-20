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

    // SWC loader 문제 해결
    if (config.module && config.module.rules) {
      // next-swc-loader-patch 관련 문제 해결
      config.module.rules = config.module.rules.map((rule: any) => {
        if (rule && rule.use && Array.isArray(rule.use)) {
          // next-swc-loader-patch loader를 찾아서 제거
          rule.use = rule.use.filter((loader: any) => {
            if (typeof loader === 'string') {
              return !loader.includes('next-swc-loader-patch');
            }
            if (loader && typeof loader === 'object') {
              if (loader.loader && loader.loader.includes('next-swc-loader-patch')) {
                return false;
              }
            }
            return true;
          });
        }
        return rule;
      });
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
