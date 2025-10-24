'use client';

import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import DiariesNew from '@/components/diaries-new';

/**
 * 모달 링크 훅의 반환 타입
 */
export interface UseLinkModalReturn {
  /**
   * 일기쓰기 모달을 여는 함수
   */
  openWriteDiaryModal: () => void;
}

/**
 * 일기쓰기 모달을 관리하는 훅
 * 
 * @returns {UseLinkModalReturn} 모달 관련 함수들
 * 
 * @example
 * ```tsx
 * const { openWriteDiaryModal } = useLinkModal();
 * 
 * return (
 *   <button onClick={openWriteDiaryModal}>
 *     일기쓰기
 *   </button>
 * );
 * ```
 */
export const useLinkModal = (): UseLinkModalReturn => {
  const { openModal } = useModal();

  /**
   * 일기쓰기 모달을 여는 함수
   */
  const openWriteDiaryModal = useCallback(() => {
    openModal(<DiariesNew />);
  }, [openModal]);

  return {
    openWriteDiaryModal,
  };
};
