/**
 * Color Tokens
 * 프로젝트 전체에서 사용되는 색상 토큰 정의
 * 라이트/다크 모드를 모두 지원합니다.
 */

export const colorTokens = {
  // Primary Colors
  primary: {
    50: { light: '#f0f9ff', dark: '#0c1e2e' },
    100: { light: '#e0f2fe', dark: '#1a3a52' },
    200: { light: '#bae6fd', dark: '#2d5676' },
    300: { light: '#7dd3fc', dark: '#4a7a9e' },
    400: { light: '#38bdf8', dark: '#6ba3c9' },
    500: { light: '#0ea5e9', dark: '#8dcdf5' },
    600: { light: '#0284c7', dark: '#b0e0fb' },
    700: { light: '#0369a1', dark: '#c9ebfd' },
    800: { light: '#075985', dark: '#e0f4fe' },
    900: { light: '#0c4a6e', dark: '#f0f9ff' },
  },

  // Secondary Colors
  secondary: {
    50: { light: '#faf5ff', dark: '#1a0f23' },
    100: { light: '#f3e8ff', dark: '#2d1a42' },
    200: { light: '#e9d5ff', dark: '#4a2a66' },
    300: { light: '#d8b4fe', dark: '#6d3f94' },
    400: { light: '#c084fc', dark: '#9460c7' },
    500: { light: '#a855f7', dark: '#b98beb' },
    600: { light: '#9333ea', dark: '#d0b5f5' },
    700: { light: '#7e22ce', dark: '#e3d5fa' },
    800: { light: '#6b21a8', dark: '#f0e8fd' },
    900: { light: '#581c87', dark: '#faf5ff' },
  },

  // Gray Scale
  gray: {
    50: { light: '#fafafa', dark: '#0a0a0a' },
    100: { light: '#f4f4f5', dark: '#18181b' },
    200: { light: '#e4e4e7', dark: '#27272a' },
    300: { light: '#d4d4d8', dark: '#3f3f46' },
    400: { light: '#a1a1aa', dark: '#52525b' },
    500: { light: '#71717a', dark: '#71717a' },
    600: { light: '#52525b', dark: '#a1a1aa' },
    700: { light: '#3f3f46', dark: '#d4d4d8' },
    800: { light: '#27272a', dark: '#e4e4e7' },
    900: { light: '#18181b', dark: '#f4f4f5' },
    950: { light: '#09090b', dark: '#fafafa' },
  },

  // Semantic Colors
  success: {
    light: { light: '#f0fdf4', dark: '#0a1f0f' },
    DEFAULT: { light: '#22c55e', dark: '#4ade80' },
    dark: { light: '#166534', dark: '#bbf7d0' },
  },

  error: {
    light: { light: '#fef2f2', dark: '#1f0a0a' },
    DEFAULT: { light: '#ef4444', dark: '#f87171' },
    dark: { light: '#991b1b', dark: '#fecaca' },
  },

  warning: {
    light: { light: '#fffbeb', dark: '#1f1a0a' },
    DEFAULT: { light: '#f59e0b', dark: '#fbbf24' },
    dark: { light: '#92400e', dark: '#fde68a' },
  },

  info: {
    light: { light: '#eff6ff', dark: '#0a1623' },
    DEFAULT: { light: '#3b82f6', dark: '#60a5fa' },
    dark: { light: '#1e40af', dark: '#bfdbfe' },
  },

  // Background Colors
  background: {
    primary: { light: '#ffffff', dark: '#0a0a0a' },
    secondary: { light: '#f9fafb', dark: '#18181b' },
    tertiary: { light: '#f3f4f6', dark: '#27272a' },
    inverse: { light: '#111827', dark: '#f9fafb' },
  },

  // Text Colors
  text: {
    primary: { light: '#111827', dark: '#f9fafb' },
    secondary: { light: '#4b5563', dark: '#d1d5db' },
    tertiary: { light: '#6b7280', dark: '#9ca3af' },
    disabled: { light: '#9ca3af', dark: '#6b7280' },
    inverse: { light: '#ffffff', dark: '#111827' },
    link: { light: '#2563eb', dark: '#60a5fa' },
  },

  // Border Colors
  border: {
    light: { light: '#e5e7eb', dark: '#374151' },
    DEFAULT: { light: '#d1d5db', dark: '#4b5563' },
    dark: { light: '#9ca3af', dark: '#6b7280' },
    focus: { light: '#3b82f6', dark: '#60a5fa' },
  },

  // Surface Colors (for cards, modals, etc.)
  surface: {
    base: { light: '#ffffff', dark: '#18181b' },
    raised: { light: '#ffffff', dark: '#27272a' },
    overlay: { light: '#ffffff', dark: '#3f3f46' },
  },
} as const;

/**
 * CSS 변수명 매핑
 * Tailwind와 CSS에서 사용할 수 있는 변수명 정의
 */
export const colorVariables = {
  // Primary
  'primary-50': 'var(--color-primary-50)',
  'primary-100': 'var(--color-primary-100)',
  'primary-200': 'var(--color-primary-200)',
  'primary-300': 'var(--color-primary-300)',
  'primary-400': 'var(--color-primary-400)',
  'primary-500': 'var(--color-primary-500)',
  'primary-600': 'var(--color-primary-600)',
  'primary-700': 'var(--color-primary-700)',
  'primary-800': 'var(--color-primary-800)',
  'primary-900': 'var(--color-primary-900)',

  // Secondary
  'secondary-50': 'var(--color-secondary-50)',
  'secondary-100': 'var(--color-secondary-100)',
  'secondary-200': 'var(--color-secondary-200)',
  'secondary-300': 'var(--color-secondary-300)',
  'secondary-400': 'var(--color-secondary-400)',
  'secondary-500': 'var(--color-secondary-500)',
  'secondary-600': 'var(--color-secondary-600)',
  'secondary-700': 'var(--color-secondary-700)',
  'secondary-800': 'var(--color-secondary-800)',
  'secondary-900': 'var(--color-secondary-900)',

  // Gray
  'gray-50': 'var(--color-gray-50)',
  'gray-100': 'var(--color-gray-100)',
  'gray-200': 'var(--color-gray-200)',
  'gray-300': 'var(--color-gray-300)',
  'gray-400': 'var(--color-gray-400)',
  'gray-500': 'var(--color-gray-500)',
  'gray-600': 'var(--color-gray-600)',
  'gray-700': 'var(--color-gray-700)',
  'gray-800': 'var(--color-gray-800)',
  'gray-900': 'var(--color-gray-900)',
  'gray-950': 'var(--color-gray-950)',

  // Semantic
  'success-light': 'var(--color-success-light)',
  'success': 'var(--color-success)',
  'success-dark': 'var(--color-success-dark)',
  'error-light': 'var(--color-error-light)',
  'error': 'var(--color-error)',
  'error-dark': 'var(--color-error-dark)',
  'warning-light': 'var(--color-warning-light)',
  'warning': 'var(--color-warning)',
  'warning-dark': 'var(--color-warning-dark)',
  'info-light': 'var(--color-info-light)',
  'info': 'var(--color-info)',
  'info-dark': 'var(--color-info-dark)',

  // Background
  'bg-primary': 'var(--color-bg-primary)',
  'bg-secondary': 'var(--color-bg-secondary)',
  'bg-tertiary': 'var(--color-bg-tertiary)',
  'bg-inverse': 'var(--color-bg-inverse)',

  // Text
  'text-primary': 'var(--color-text-primary)',
  'text-secondary': 'var(--color-text-secondary)',
  'text-tertiary': 'var(--color-text-tertiary)',
  'text-disabled': 'var(--color-text-disabled)',
  'text-inverse': 'var(--color-text-inverse)',
  'text-link': 'var(--color-text-link)',

  // Border
  'border-light': 'var(--color-border-light)',
  'border': 'var(--color-border)',
  'border-dark': 'var(--color-border-dark)',
  'border-focus': 'var(--color-border-focus)',

  // Surface
  'surface-base': 'var(--color-surface-base)',
  'surface-raised': 'var(--color-surface-raised)',
  'surface-overlay': 'var(--color-surface-overlay)',
} as const;

/**
 * 타입 정의
 */
export type ColorMode = 'light' | 'dark';
export type ColorToken = keyof typeof colorTokens;
export type ColorVariable = keyof typeof colorVariables;

