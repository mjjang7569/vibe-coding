'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectboxProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  theme?: 'light' | 'dark';
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Selectbox: React.FC<SelectboxProps> = ({
  options = [],
  value,
  defaultValue,
  placeholder = '선택해주세요',
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  disabled = false,
  className = '',
  onChange,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          onClose?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          // 다음 옵션으로 이동
          break;
        case 'ArrowUp':
          event.preventDefault();
          // 이전 옵션으로 이동
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          // 현재 포커스된 옵션 선택
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // value prop 변경 감지
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;
    
    setInternalValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    onClose?.();
  };

  const selectedOption = options.find(option => option.value === internalValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // CSS 클래스 조합
  const selectClasses = [
    styles.selectbox,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    disabled ? styles.disabled : '',
    isOpen ? styles.open : '',
    className,
  ].filter(Boolean).join(' ');

  const dropdownClasses = [
    styles.dropdown,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    isOpen ? styles.open : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      <div
        ref={selectRef}
        className={selectClasses}
        onClick={handleToggle}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="selectbox-dropdown"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={styles.displayText}>
          {displayText}
        </span>
        <Image
          src="/icons/arrow_drop_down.svg"
          alt="드롭다운 화살표"
          width={24}
          height={24}
          className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={dropdownClasses}
          role="listbox"
          id="selectbox-dropdown"
          aria-label="옵션 목록"
        >
          {options.map((option) => {
            const isSelected = option.value === internalValue;
            const optionClasses = [
              styles.option,
              isSelected ? styles.selected : '',
              option.disabled ? styles.disabled : '',
            ].filter(Boolean).join(' ');

            return (
              <div
                key={option.value}
                className={optionClasses}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
              >
                <span className={styles.optionText}>
                  {option.label}
                </span>
                {isSelected && (
                  <Image
                    src="/icons/check_outline_light_xs.svg"
                    alt="선택됨"
                    width={16}
                    height={16}
                    className={styles.checkIcon}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selectbox;
