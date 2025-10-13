/**
 * Typography Tokens
 * 프로젝트 전체에서 사용되는 타이포그래피 토큰 정의
 * 모바일/데스크톱 반응형을 지원하며, 한글/영문 별도 설정이 가능합니다.
 */

export type DeviceType = 'mobile' | 'desktop';
export type LanguageType = 'ko' | 'en';

/**
 * Font Family 토큰
 */
export const fontFamilyTokens = {
  ko: {
    primary: '"Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    secondary: '"Noto Sans KR", sans-serif',
    mono: '"D2Coding", "Fira Code", monospace',
  },
  en: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Inter", sans-serif',
    mono: '"Fira Code", "JetBrains Mono", monospace',
  },
} as const;

/**
 * Font Weight 토큰
 */
export const fontWeightTokens = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/**
 * Typography 스타일 토큰
 * 각 스타일은 모바일/데스크톱에 따라 다른 값을 가질 수 있습니다.
 */
export const typographyTokens = {
  // Display Styles - 큰 헤드라인용
  display: {
    xl: {
      mobile: {
        fontSize: '3.5rem', // 56px
        lineHeight: '4rem', // 64px
        letterSpacing: '-0.02em',
        fontWeight: fontWeightTokens.bold,
      },
      desktop: {
        fontSize: '4.5rem', // 72px
        lineHeight: '5rem', // 80px
        letterSpacing: '-0.02em',
        fontWeight: fontWeightTokens.bold,
      },
    },
    lg: {
      mobile: {
        fontSize: '3rem', // 48px
        lineHeight: '3.5rem', // 56px
        letterSpacing: '-0.02em',
        fontWeight: fontWeightTokens.bold,
      },
      desktop: {
        fontSize: '3.75rem', // 60px
        lineHeight: '4.25rem', // 68px
        letterSpacing: '-0.02em',
        fontWeight: fontWeightTokens.bold,
      },
    },
    md: {
      mobile: {
        fontSize: '2.5rem', // 40px
        lineHeight: '3rem', // 48px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.bold,
      },
      desktop: {
        fontSize: '3rem', // 48px
        lineHeight: '3.5rem', // 56px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.bold,
      },
    },
    sm: {
      mobile: {
        fontSize: '2rem', // 32px
        lineHeight: '2.5rem', // 40px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '2.25rem', // 36px
        lineHeight: '2.75rem', // 44px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
    },
  },

  // Heading Styles
  heading: {
    h1: {
      mobile: {
        fontSize: '1.875rem', // 30px
        lineHeight: '2.375rem', // 38px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.bold,
      },
      desktop: {
        fontSize: '2.25rem', // 36px
        lineHeight: '2.75rem', // 44px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.bold,
      },
    },
    h2: {
      mobile: {
        fontSize: '1.5rem', // 24px
        lineHeight: '2rem', // 32px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.bold,
      },
      desktop: {
        fontSize: '1.875rem', // 30px
        lineHeight: '2.375rem', // 38px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.bold,
      },
    },
    h3: {
      mobile: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.75rem', // 28px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '1.5rem', // 24px
        lineHeight: '2rem', // 32px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
    },
    h4: {
      mobile: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.625rem', // 26px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.75rem', // 28px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
    },
    h5: {
      mobile: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.625rem', // 26px
        letterSpacing: '-0.01em',
        fontWeight: fontWeightTokens.semibold,
      },
    },
    h6: {
      mobile: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
    },
  },

  // Body Text Styles
  body: {
    xl: {
      mobile: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.75rem', // 28px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.875rem', // 30px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
    lg: {
      mobile: {
        fontSize: '1rem', // 16px
        lineHeight: '1.625rem', // 26px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.75rem', // 28px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
    md: {
      mobile: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.375rem', // 22px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
    sm: {
      mobile: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.375rem', // 22px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
    xs: {
      mobile: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1.125rem', // 18px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
  },

  // Caption/Label Styles
  caption: {
    lg: {
      mobile: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.medium,
      },
      desktop: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.medium,
      },
    },
    md: {
      mobile: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.125rem', // 18px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.medium,
      },
      desktop: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.125rem', // 18px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.medium,
      },
    },
    sm: {
      mobile: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.medium,
      },
      desktop: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.medium,
      },
    },
    xs: {
      mobile: {
        fontSize: '0.6875rem', // 11px
        lineHeight: '0.875rem', // 14px
        letterSpacing: '0.01em',
        fontWeight: fontWeightTokens.medium,
      },
      desktop: {
        fontSize: '0.6875rem', // 11px
        lineHeight: '0.875rem', // 14px
        letterSpacing: '0.01em',
        fontWeight: fontWeightTokens.medium,
      },
    },
  },

  // Label/Button Styles
  label: {
    lg: {
      mobile: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
    },
    md: {
      mobile: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
    },
    sm: {
      mobile: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.125rem', // 18px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.125rem', // 18px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
    },
    xs: {
      mobile: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
      desktop: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.semibold,
      },
    },
  },

  // Code/Mono Styles
  code: {
    lg: {
      mobile: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
    md: {
      mobile: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
    sm: {
      mobile: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.125rem', // 18px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
      desktop: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.125rem', // 18px
        letterSpacing: '0',
        fontWeight: fontWeightTokens.regular,
      },
    },
  },
} as const;

/**
 * CSS 변수명 매핑
 * Tailwind와 CSS에서 사용할 수 있는 변수명 정의
 */
export const typographyVariables = {
  // Font Family Variables
  'font-ko-primary': 'var(--font-ko-primary)',
  'font-ko-secondary': 'var(--font-ko-secondary)',
  'font-ko-mono': 'var(--font-ko-mono)',
  'font-en-primary': 'var(--font-en-primary)',
  'font-en-secondary': 'var(--font-en-secondary)',
  'font-en-mono': 'var(--font-en-mono)',

  // Display Styles
  'display-xl': 'var(--typography-display-xl)',
  'display-lg': 'var(--typography-display-lg)',
  'display-md': 'var(--typography-display-md)',
  'display-sm': 'var(--typography-display-sm)',

  // Heading Styles
  'heading-h1': 'var(--typography-heading-h1)',
  'heading-h2': 'var(--typography-heading-h2)',
  'heading-h3': 'var(--typography-heading-h3)',
  'heading-h4': 'var(--typography-heading-h4)',
  'heading-h5': 'var(--typography-heading-h5)',
  'heading-h6': 'var(--typography-heading-h6)',

  // Body Styles
  'body-xl': 'var(--typography-body-xl)',
  'body-lg': 'var(--typography-body-lg)',
  'body-md': 'var(--typography-body-md)',
  'body-sm': 'var(--typography-body-sm)',
  'body-xs': 'var(--typography-body-xs)',

  // Caption Styles
  'caption-lg': 'var(--typography-caption-lg)',
  'caption-md': 'var(--typography-caption-md)',
  'caption-sm': 'var(--typography-caption-sm)',
  'caption-xs': 'var(--typography-caption-xs)',

  // Label Styles
  'label-lg': 'var(--typography-label-lg)',
  'label-md': 'var(--typography-label-md)',
  'label-sm': 'var(--typography-label-sm)',
  'label-xs': 'var(--typography-label-xs)',

  // Code Styles
  'code-lg': 'var(--typography-code-lg)',
  'code-md': 'var(--typography-code-md)',
  'code-sm': 'var(--typography-code-sm)',
} as const;

/**
 * 유틸리티 타입 정의
 */
export type FontWeight = keyof typeof fontWeightTokens;
export type TypographyCategory = keyof typeof typographyTokens;
export type TypographyVariable = keyof typeof typographyVariables;

/**
 * 특정 디바이스와 언어에 맞는 폰트 패밀리를 반환하는 헬퍼 함수
 */
export function getFontFamily(language: LanguageType, type: 'primary' | 'secondary' | 'mono' = 'primary'): string {
  return fontFamilyTokens[language][type];
}

/**
 * 특정 디바이스에 맞는 타이포그래피 스타일을 반환하는 헬퍼 함수
 */
export function getTypographyStyle(
  category: keyof typeof typographyTokens,
  size: string,
  device: DeviceType
): {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
} | null {
  const categoryStyles = typographyTokens[category] as Record<string, Record<DeviceType, {
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    fontWeight: string;
  }>>;
  if (!categoryStyles || !categoryStyles[size]) {
    return null;
  }
  return categoryStyles[size][device];
}

