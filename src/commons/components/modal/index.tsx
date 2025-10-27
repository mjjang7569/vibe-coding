'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { Button } from '@/commons/components/button';
import styles from './styles.module.css';

/**
 * Modal Variant Types
 */
export type ModalVariant = 'info' | 'danger';

/**
 * Modal Actions Types
 */
export type ModalActions = 'single' | 'dual';

/**
 * Modal Theme Types
 */
export type ModalTheme = 'light' | 'dark';

/**
 * Modal Props Interface
 */
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 모달 변형 타입
   * @default 'info'
   */
  variant?: ModalVariant;

  /**
   * 액션 버튼 개수
   * @default 'single'
   */
  actions?: ModalActions;

  /**
   * 모달 테마
   * @default 'light'
   */
  theme?: ModalTheme;

  /**
   * 모달 제목
   */
  title: string;

  /**
   * 모달 설명 메시지
   */
  message: string;

  /**
   * Primary 버튼 텍스트
   * @default '확인'
   */
  primaryButtonText?: string;

  /**
   * Secondary 버튼 텍스트 (dual actions에서만 사용)
   * @default '취소'
   */
  secondaryButtonText?: string;

  /**
   * Primary 버튼 클릭 핸들러
   */
  onPrimaryClick?: () => void;

  /**
   * Secondary 버튼 클릭 핸들러 (dual actions에서만 사용)
   */
  onSecondaryClick?: () => void;

  /**
   * Primary 버튼 비활성화 여부
   * @default false
   */
  primaryButtonDisabled?: boolean;

  /**
   * Secondary 버튼 비활성화 여부
   * @default false
   */
  secondaryButtonDisabled?: boolean;
}

/**
 * Modal Component
 * 
 * modal.provider와 함께 사용되는 모달 컴포넌트입니다.
 * variant, actions, theme를 지원합니다.
 * 
 * @example
 * ```tsx
 * // Single action
 * <Modal
 *   variant="info"
 *   actions="single"
 *   title="일기 등록 완료"
 *   message="등록이 완료 되었습니다."
 *   onPrimaryClick={() => console.log('확인')}
 * />
 * 
 * // Dual actions
 * <Modal
 *   variant="info"
 *   actions="dual"
 *   title="일기 등록 취소"
 *   message="일기 등록을 취소 하시겠어요?"
 *   primaryButtonText="등록 취소"
 *   secondaryButtonText="계속 작성"
 *   onPrimaryClick={() => console.log('등록 취소')}
 *   onSecondaryClick={() => console.log('계속 작성')}
 * />
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      variant = 'info',
      actions = 'single',
      theme = 'light',
      title,
      message,
      primaryButtonText = '확인',
      secondaryButtonText = '취소',
      onPrimaryClick,
      onSecondaryClick,
      primaryButtonDisabled = false,
      secondaryButtonDisabled = false,
      className = '',
      ...restProps
    },
    ref
  ) => {
  // CSS 클래스 조합
  const modalClasses = [
    styles.modal,
    styles[`variant-${variant}`],
    styles[`theme-${theme}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const headerClasses = [
    styles.header,
    styles[`theme-${theme}`],
  ]
    .filter(Boolean)
    .join(' ');

  const titleClasses = [
    styles.title,
    styles[`theme-${theme}`],
  ]
    .filter(Boolean)
    .join(' ');

  const messageClasses = [
    styles.message,
    styles[`theme-${theme}`],
  ]
    .filter(Boolean)
    .join(' ');

  const actionsClasses = [
    styles.actions,
    styles[`actions-${actions}`],
  ]
    .filter(Boolean)
    .join(' ');

  // Dark 테마 버튼 로직 (Figma 노드 0:8929, 0:9126 기준)
  // Dark + Single: primary 버튼은 theme="light" (white 배경)
  // Dark + Dual: secondary는 커스텀 스타일, primary는 theme="dark" (#f2f2f2 배경)
  const isDarkTheme = theme === 'dark';
  const isDualActions = actions === 'dual';
  
  // Primary 버튼 theme 결정
  const primaryButtonTheme = isDarkTheme && isDualActions ? 'dark' : 'light';
  
  // Secondary 버튼 className (Dark + Dual일 때 커스텀 스타일)
  const secondaryButtonClassName = [
    styles.dualButton,
    isDarkTheme ? styles.darkDualSecondaryButton : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={modalClasses}
      {...restProps}
    >
      <div className={headerClasses}>
        <h2 className={titleClasses}>{title}</h2>
        <p className={messageClasses}>{message}</p>
      </div>
      
      <div className={actionsClasses}>
        {actions === 'dual' && (
          <Button
            variant="secondary"
            theme="light"
            size="medium"
            onClick={onSecondaryClick}
            disabled={secondaryButtonDisabled}
            className={secondaryButtonClassName}
          >
            {secondaryButtonText}
          </Button>
        )}
        <Button
          variant="primary"
          theme={primaryButtonTheme}
          size="medium"
          onClick={onPrimaryClick}
          disabled={primaryButtonDisabled}
          className={actions === 'single' ? styles.singleButton : styles.dualButton}
        >
          {primaryButtonText}
        </Button>
      </div>
    </div>
  );
  }
);

Modal.displayName = 'Modal';

export default Modal;

