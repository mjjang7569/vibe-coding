'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.css';

/**
 * Button Variant Types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

/**
 * Button Size Types
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button Theme Types
 */
export type ButtonTheme = 'light' | 'dark';

/**
 * Button Props Interface
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 변형 타입
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * 버튼 크기
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * 버튼 테마
   * @default 'light'
   */
  theme?: ButtonTheme;

  /**
   * 버튼 내용
   */
  children: React.ReactNode;

  /**
   * 전체 너비 사용 여부
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;
}

/**
 * Button Component
 * 
 * 다양한 variant, size, theme를 지원하는 버튼 컴포넌트입니다.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" theme="light">
 *   클릭하세요
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      children,
      fullWidth = false,
      disabled = false,
      className = '',
      ...restProps
    },
    ref
  ) => {
    // CSS 클래스 조합
    const buttonClasses = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;