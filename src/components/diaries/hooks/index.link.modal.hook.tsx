'use client';

import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import DiariesNew from '@/components/diaries-new';

/**
 * 모달 링크 훅의 반환 타입
 */
export interface UseLinkModalReturn {
  /**
   * 일기쓰기 모달을 여는 함수
   * 권한 검사를 통과한 경우에만 모달이 열립니다.
   */
  openWriteDiaryModal: () => void;
}

/**
 * 일기쓰기 모달을 관리하는 훅
 * 
 * 권한 검사를 통과한 경우에만 일기쓰기 모달이 열립니다.
 * 비로그인 사용자의 경우 로그인 요청 모달이 표시됩니다.
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
  const authGuard = useAuthGuard();

  /**
   * 일기쓰기 모달을 여는 함수
   * authGuard를 통해 권한 검사를 수행합니다.
   * 비로그인 사용자의 경우 로그인 요청 모달이 표시되고,
   * 로그인 사용자의 경우 일기쓰기 모달이 열립니다.
   */
  const openWriteDiaryModal = useCallback(() => {
    openModal(<DiariesNew />);
  }, [openModal]);

  // authGuard로 감싸서 권한 검사 적용
  const guardedOpenWriteDiaryModal = authGuard(openWriteDiaryModal);

  return {
    openWriteDiaryModal: guardedOpenWriteDiaryModal,
  };
};
