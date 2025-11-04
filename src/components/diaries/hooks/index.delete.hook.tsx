'use client';

import React, { useCallback, useState } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import { Modal } from '@/commons/components/modal';

/**
 * 일기 삭제 훅의 반환 타입
 */
export interface UseDeleteDiaryReturn {
  /**
   * 일기 삭제 핸들러 (authGuard 적용됨)
   * @param diaryId - 삭제할 일기의 ID
   */
  handleDelete: (diaryId: number) => void;
  
  /**
   * 삭제 처리 중 여부
   */
  isDeleting: boolean;
}

/**
 * 로컬스토리지에서 일기 삭제
 */
const deleteDiaryFromStorage = (diaryId: number): void => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem('diaries');
  if (!stored) return;
  
  const diaries = JSON.parse(stored);
  const filteredDiaries = diaries.filter((diary: { id: number }) => diary.id !== diaryId);
  localStorage.setItem('diaries', JSON.stringify(filteredDiaries));
};

/**
 * useDeleteDiary 훅
 * 
 * 일기 삭제 기능을 제공하는 훅입니다.
 * authGuard를 적용하여 로그인 사용자만 삭제할 수 있습니다.
 * 
 * @returns {UseDeleteDiaryReturn} 일기 삭제 핸들러와 삭제 상태
 * 
 * @example
 * ```tsx
 * const { handleDelete, isDeleting } = useDeleteDiary();
 * 
 * <button onClick={() => handleDelete(diaryId)}>
 *   삭제
 * </button>
 * ```
 */
export function useDeleteDiary(): UseDeleteDiaryReturn {
  const { openModal, closeModal } = useModal();
  const authGuard = useAuthGuard();
  const [isDeleting, setIsDeleting] = useState(false);
  
  /**
   * 삭제 확인 모달 표시 및 삭제 처리
   */
  const showDeleteModal = useCallback((diaryId: number) => {
    const handleConfirmDelete = () => {
      setIsDeleting(true);
      
      try {
        deleteDiaryFromStorage(diaryId);
        closeModal();
        
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } catch (error) {
        console.error('일기 삭제 실패:', error);
        setIsDeleting(false);
      }
    };
    
    const handleCancelDelete = () => {
      closeModal();
    };
    
    openModal(
      <Modal
        variant="info"
        actions="dual"
        title="일기 삭제"
        message="일기를 삭제 하시겠어요?"
        primaryButtonText="삭제"
        secondaryButtonText="취소"
        onPrimaryClick={handleConfirmDelete}
        onSecondaryClick={handleCancelDelete}
        primaryButtonDataTestId="diary-delete-confirm"
        secondaryButtonDataTestId="diary-delete-cancel"
      />
    );
  }, [openModal, closeModal]);
  
  /**
   * 일기 삭제 핸들러 (authGuard 적용)
   */
  const handleDelete = useCallback(
    (diaryId: number) => {
      const guardedFunction = authGuard(() => {
        showDeleteModal(diaryId);
      });
      guardedFunction();
    },
    [authGuard, showDeleteModal]
  );
  
  return {
    handleDelete,
    isDeleting,
  };
}

