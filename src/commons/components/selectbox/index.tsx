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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // 활성 옵션 필터링
  const activeOptions = options.filter(option => !option.disabled);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
          event.preventDefault();
          handleToggle();
        }
        return;
      }

      const currentIndex = focusedIndex;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          onClose?.();
          selectRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = currentIndex < activeOptions.length - 1 ? currentIndex + 1 : 0;
          setFocusedIndex(nextIndex);
          break;
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : activeOptions.length - 1;
          setFocusedIndex(prevIndex);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < activeOptions.length) {
            const selectedOption = activeOptions[focusedIndex];
            handleOptionClick(selectedOption.value);
          }
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(activeOptions.length - 1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, focusedIndex, activeOptions.length, activeOptions]);

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
      // 선택된 옵션의 인덱스 찾기
      const selectedIndex = activeOptions.findIndex(option => option.value === internalValue);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      onOpen?.();
    } else {
      setFocusedIndex(-1);
      onClose?.();
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;
    
    setInternalValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    onClose?.();
    selectRef.current?.focus();
  };

  // 포커스된 옵션 스크롤 처리
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

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
        aria-activedescendant={isOpen && focusedIndex >= 0 ? `option-${activeOptions[focusedIndex]?.value}` : undefined}
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
          {options.map((option, index) => {
            const isSelected = option.value === internalValue;
            const activeIndex = activeOptions.findIndex(activeOption => activeOption.value === option.value);
            const isFocused = activeIndex === focusedIndex;
            
            const optionClasses = [
              styles.option,
              isSelected ? styles.selected : '',
              option.disabled ? styles.disabled : '',
              isFocused ? styles.focused : '',
            ].filter(Boolean).join(' ');

            return (
              <div
                key={option.value}
                id={`option-${option.value}`}
                ref={(el) => {
                  if (activeIndex >= 0) {
                    optionRefs.current[activeIndex] = el;
                  }
                }}
                className={optionClasses}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                onMouseEnter={() => {
                  if (!option.disabled) {
                    setFocusedIndex(activeIndex);
                  }
                }}
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
