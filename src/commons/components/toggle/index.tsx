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

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Toggle의 variant 스타일
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * Toggle의 크기
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 테마 (라이트/다크 모드)
   */
  theme?: 'light' | 'dark';
  
  /**
   * Toggle의 활성화 상태
   */
  checked?: boolean;
  
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  
  /**
   * 라벨 텍스트
   */
  label?: string;
  
  /**
   * 클래스명
   */
  className?: string;
  
  /**
   * 상태 변경 콜백
   */
  onChange?: (checked: boolean) => void;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      checked = false,
      disabled = false,
      label,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    };

    const toggleClasses = cn(
      styles.toggle,
      styles[`toggle--${variant}`],
      styles[`toggle--${size}`],
      styles[`toggle--${theme}`],
      {
        [styles['toggle--checked']]: isChecked,
        [styles['toggle--disabled']]: disabled,
      },
      className
    );

    const trackClasses = cn(
      styles.track,
      styles[`track--${variant}`],
      styles[`track--${size}`],
      styles[`track--${theme}`],
      {
        [styles['track--checked']]: isChecked,
        [styles['track--disabled']]: disabled,
      }
    );

    const thumbClasses = cn(
      styles.thumb,
      styles[`thumb--${variant}`],
      styles[`thumb--${size}`],
      styles[`thumb--${theme}`],
      {
        [styles['thumb--checked']]: isChecked,
        [styles['thumb--disabled']]: disabled,
      }
    );

    return (
      <div className={styles.toggleWrapper}>
        {label && (
          <label className={cn(styles.label, styles[`label--${size}`], styles[`label--${theme}`])}>
            {label}
          </label>
        )}
        
        <div className={toggleClasses}>
          <input
            ref={ref}
            type="checkbox"
            className={styles.input}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
          
          <div className={trackClasses}>
            <div className={thumbClasses} />
          </div>
        </div>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
