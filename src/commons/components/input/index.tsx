'use client';

import React, { forwardRef, useState } from 'react';
// cn 함수를 직접 구현
const cn = (...classes: (string | undefined | null | false | Record<string, boolean | React.ReactNode>)[]): string => {
  return classes
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
};
import styles from './styles.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input의 variant 스타일
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * Input의 크기
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 테마 (라이트/다크 모드)
   */
  theme?: 'light' | 'dark';
  
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  
  /**
   * 에러 상태
   */
  error?: boolean;
  
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  
  /**
   * 읽기 전용 상태
   */
  readOnly?: boolean;
  
  /**
   * 에러 메시지
   */
  errorMessage?: string;
  
  /**
   * 라벨 텍스트
   */
  label?: string;
  
  /**
   * 도움말 텍스트
   */
  helperText?: string;
  
  /**
   * 왼쪽 아이콘
   */
  leftIcon?: React.ReactNode;
  
  /**
   * 오른쪽 아이콘
   */
  rightIcon?: React.ReactNode;
  
  /**
   * 클래스명
   */
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      placeholder,
      error = false,
      disabled = false,
      readOnly = false,
      errorMessage,
      label,
      helperText,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const inputClasses = cn(
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      {
        [styles['input--error']]: error,
        [styles['input--disabled']]: disabled,
        [styles['input--readonly']]: readOnly,
        [styles['input--focused']]: isFocused,
        [styles['input--with-left-icon']]: leftIcon,
        [styles['input--with-right-icon']]: rightIcon,
      },
      className
    );

    const containerClasses = cn(
      styles.inputContainer,
      styles[`inputContainer--${variant}`],
      styles[`inputContainer--${size}`],
      styles[`inputContainer--${theme}`],
      {
        [styles['inputContainer--error']]: error,
        [styles['inputContainer--disabled']]: disabled,
        [styles['inputContainer--focused']]: isFocused,
      }
    );

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label className={cn(styles.label, styles[`label--${size}`], styles[`label--${theme}`])}>
            {label}
          </label>
        )}
        
        <div className={containerClasses}>
          {leftIcon && (
            <div className={cn(styles.icon, styles.iconLeft, styles[`icon--${size}`])}>
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {rightIcon && (
            <div className={cn(styles.icon, styles.iconRight, styles[`icon--${size}`])}>
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error && errorMessage) && (
          <div className={cn(styles.errorMessage, styles[`errorMessage--${size}`], styles[`errorMessage--${theme}`])}>
            {errorMessage}
          </div>
        )}
        
        {helperText && !error && (
          <div className={cn(styles.helperText, styles[`helperText--${size}`], styles[`helperText--${theme}`])}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
