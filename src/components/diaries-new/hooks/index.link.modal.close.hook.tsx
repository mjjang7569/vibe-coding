'use client';

import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import Modal from '@/commons/components/modal';

/**
 * 모달 닫기 훅의 반환 타입
 */
export interface UseLinkModalCloseReturn {
  /**
   * 등록취소 확인 모달을 여는 함수
   */
  openCancelConfirmModal: () => void;
}

/**
 * 일기쓰기 모달의 닫기 기능을 관리하는 훅
 * 
 * 닫기 버튼 클릭 시 등록취소 확인 모달을 2중으로 띄우고,
 * 사용자의 선택에 따라 적절하게 모달을 닫습니다.
 * 
 * @returns {UseLinkModalCloseReturn} 모달 관련 함수들
 * 
 * @example
 * ```tsx
 * const { openCancelConfirmModal } = useLinkModalClose();
 * 
 * return (
 *   <button onClick={openCancelConfirmModal}>
 *     닫기
 *   </button>
 * );
 * ```
 */
export const useLinkModalClose = (): UseLinkModalCloseReturn => {
  const { openModal, closeModal } = useModal();

  /**
   * 등록취소 확인 모달을 여는 함수
   * 일기쓰기 모달 위에 2중 모달로 overlay됩니다.
   */
  const openCancelConfirmModal = useCallback(() => {
    /**
     * 계속작성 버튼 핸들러
     * 등록취소 모달만 닫습니다.
     */
    const handleContinue = () => {
      closeModal(); // 등록취소 모달만 닫음
    };

    /**
     * 등록취소 버튼 핸들러
     * 등록취소 모달과 일기쓰기 모달을 모두 닫습니다.
     */
    const handleCancel = () => {
      closeModal(); // 등록취소 모달 닫음
      
      // 일기쓰기 모달도 닫기 위해 closeModal을 한 번 더 호출
      // setTimeout을 사용하여 이전 closeModal이 완료된 후 실행
      setTimeout(() => {
        closeModal(); // 일기쓰기 모달 닫음
      }, 0);
    };

    // 등록취소 확인 모달을 열기
    openModal(
      <div data-testid="cancel-modal">
        <Modal
          variant="info"
          actions="dual"
          title="일기 등록 취소"
          message="일기 등록을 취소 하시겠어요?"
          primaryButtonText="등록 취소"
          secondaryButtonText="계속 작성"
          onPrimaryClick={handleCancel}
          onSecondaryClick={handleContinue}
          primaryButtonDataTestId="cancel-modal-cancel-button"
          secondaryButtonDataTestId="cancel-modal-continue-button"
        />
      </div>
    );
  }, [openModal, closeModal]);

  return {
    openCancelConfirmModal,
  };
};
