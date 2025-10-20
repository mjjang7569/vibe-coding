'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectboxVariant = 'primary' | 'secondary' | 'tertiary';
export type SelectboxSize = 'small' | 'medium' | 'large';
export type SelectboxTheme = 'light' | 'dark';

export interface SelectboxProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  variant?: SelectboxVariant;
  size?: SelectboxSize;
  theme?: SelectboxTheme;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  'data-testid'?: string;
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
  'data-testid': testId,
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
      const target = event.target as Node;
      if (
        isOpen &&
        selectRef.current &&
        !selectRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 활성 옵션 필터링
  const activeOptions = React.useMemo(() => 
    options.filter(option => !option.disabled),
    [options]
  );

  // 키보드 네비게이션 - useCallback으로 함수 정의
  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        if (disabled || options.length === 0) return;
        setIsOpen(true);
        const selectedIndex = activeOptions.findIndex(option => option.value === internalValue);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
        onOpen?.();
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
          if (!disabled) {
            setInternalValue(selectedOption.value);
            onChange?.(selectedOption.value);
            setIsOpen(false);
            setFocusedIndex(-1);
            onClose?.();
            setTimeout(() => {
              selectRef.current?.focus();
            }, 100);
          }
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
  }, [isOpen, focusedIndex, activeOptions, internalValue, disabled, options.length, onChange, onOpen, onClose]);

  // 키보드 이벤트 리스너 등록
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // value prop 변경 감지
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleToggle = React.useCallback(() => {
    if (disabled || options.length === 0) return;
    
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
  }, [disabled, isOpen, options.length, activeOptions, internalValue, onOpen, onClose]);

  const handleOptionClick = React.useCallback((optionValue: string) => {
    if (disabled) return;
    
    setInternalValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    onClose?.();
    // 약간의 지연 후 포커스 복원 (애니메이션 완료 대기)
    setTimeout(() => {
      selectRef.current?.focus();
    }, 100);
  }, [disabled, onChange, onClose]);

  // 포커스된 옵션 스크롤 처리
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  const selectedOption = React.useMemo(() => 
    options.find(option => option.value === internalValue),
    [options, internalValue]
  );
  
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
    <div className={styles.container} data-testid={testId ? `${testId}-container` : undefined}>
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
        data-testid={testId}
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
          data-testid={testId ? `${testId}-dropdown` : undefined}
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
                data-testid={testId ? `${testId}-option-${option.value}` : undefined}
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
