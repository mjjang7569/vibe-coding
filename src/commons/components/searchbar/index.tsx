'use client';

import React, { forwardRef, useState } from 'react';
import styles from './styles.module.css';

/**
 * Searchbar Variant Types
 */
export type SearchbarVariant = 'primary' | 'secondary' | 'tertiary';

/**
 * Searchbar Size Types
 */
export type SearchbarSize = 'small' | 'medium' | 'large';

/**
 * Searchbar Theme Types
 */
export type SearchbarTheme = 'light' | 'dark';

/**
 * Searchbar Props Interface
 */
export interface SearchbarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 검색바 변형 타입
   * @default 'primary'
   */
  variant?: SearchbarVariant;

  /**
   * 검색바 크기
   * @default 'medium'
   */
  size?: SearchbarSize;

  /**
   * 검색바 테마
   * @default 'light'
   */
  theme?: SearchbarTheme;

  /**
   * 플레이스홀더 텍스트
   * @default '검색어를 입력해 주세요.'
   */
  placeholder?: string;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 읽기 전용 상태
   * @default false
   */
  readOnly?: boolean;

  /**
   * 검색 아이콘 표시 여부
   * @default true
   */
  showSearchIcon?: boolean;

  /**
   * 검색 아이콘 커스텀
   */
  searchIcon?: React.ReactNode;

  /**
   * 클래스명
   */
  className?: string;

  /**
   * 검색 실행 콜백
   */
  onSearch?: (value: string) => void;

  /**
   * 입력값 변경 콜백
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Searchbar Component
 * 
 * 다양한 variant, size, theme를 지원하는 검색바 컴포넌트입니다.
 * 피그마 디자인을 기반으로 구현되었습니다.
 * 
 * @example
 * ```tsx
 * <Searchbar 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   placeholder="검색어를 입력해 주세요."
 *   onSearch={(value) => console.log(value)}
 * />
 * ```
 */
export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      placeholder = '검색어를 입력해 주세요.',
      disabled = false,
      readOnly = false,
      showSearchIcon = true,
      searchIcon,
      className = '',
      onSearch,
      onChange,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      restProps.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      restProps.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(value);
      }
      onKeyDown?.(e);
    };

    // CSS 클래스 조합
    const searchbarClasses = [
      styles.searchbar,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      isFocused && styles.focused,
      disabled && styles.disabled,
      readOnly && styles.readOnly,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      styles.searchbarContainer,
      styles[`container-${variant}`],
      styles[`container-${size}`],
      styles[`container-${theme}`],
      isFocused && styles.containerFocused,
      disabled && styles.containerDisabled,
    ]
      .filter(Boolean)
      .join(' ');

    // 기본 검색 아이콘 (public/icons에서 가져옴)
    const defaultSearchIcon = (
      <img
        src="/icons/search_outline_light_m.svg"
        alt="검색"
        className={styles.searchIcon}
      />
    );

    return (
      <div className={containerClasses}>
        {showSearchIcon && (
          <div className={styles.iconContainer}>
            {searchIcon || defaultSearchIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type="text"
          className={searchbarClasses}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...restProps}
        />
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

export default Searchbar;
