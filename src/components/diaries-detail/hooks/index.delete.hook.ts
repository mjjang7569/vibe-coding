'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 일기 타입 정의
 */
interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * useDeleteDiary Hook 반환 타입
 */
export interface UseDeleteDiaryReturn {
  /**
   * 삭제 모달 표시 상태
   */
  isDeleteModalOpen: boolean;
  
  /**
   * 삭제 모달 열기
   */
  openDeleteModal: () => void;
  
  /**
   * 삭제 모달 닫기
   */
  closeDeleteModal: () => void;
  
  /**
   * 일기 삭제 실행
   */
  handleDelete: () => void;
  
  /**
   * 삭제 중 상태
   */
  isDeleting: boolean;
}

/**
 * useDeleteDiary Hook Props
 */
export interface UseDeleteDiaryProps {
  /**
   * 삭제할 일기 ID
   */
  diaryId: number;
  
  /**
   * 삭제 성공 시 콜백
   */
  onSuccess?: () => void;
  
  /**
   * 삭제 실패 시 콜백
   */
  onError?: (error: Error) => void;
}

/**
 * useDeleteDiary Hook
 * 
 * 일기 삭제 기능을 제공하는 커스텀 훅입니다.
 * - 삭제 모달 상태 관리
 * - 로컬스토리지에서 일기 삭제
 * - 삭제 후 /diaries 페이지로 리다이렉트
 * 
 * @param props - 훅 설정 옵션
 * @returns {UseDeleteDiaryReturn} 삭제 관련 함수 및 상태
 * 
 * @example
 * ```tsx
 * const { isDeleteModalOpen, openDeleteModal, closeDeleteModal, handleDelete } = useDeleteDiary({
 *   diaryId: 1,
 *   onSuccess: () => console.log('삭제 완료'),
 *   onError: (error) => console.error('삭제 실패:', error)
 * });
 * ```
 */
export const useDeleteDiary = ({
  diaryId,
  onSuccess,
  onError
}: UseDeleteDiaryProps): UseDeleteDiaryReturn => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * 삭제 모달 열기
   */
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  /**
   * 삭제 모달 닫기
   */
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  /**
   * 일기 삭제 실행
   * 1. 로컬스토리지에서 diaries 가져오기
   * 2. 해당 ID의 일기 제거
   * 3. 로컬스토리지 업데이트
   * 4. /diaries 페이지로 리다이렉트
   */
  const handleDelete = () => {
    try {
      setIsDeleting(true);

      // 로컬스토리지에서 diaries 가져오기
      const diariesStr = localStorage.getItem('diaries');
      if (!diariesStr) {
        throw new Error('저장된 일기가 없습니다.');
      }

      const diaries: Diary[] = JSON.parse(diariesStr);

      // 해당 ID의 일기 제거
      const updatedDiaries = diaries.filter((diary) => diary.id !== diaryId);

      // 로컬스토리지 업데이트
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));

      // 삭제 성공 콜백 호출
      if (onSuccess) {
        onSuccess();
      }

      // /diaries 페이지로 리다이렉트
      router.push('/diaries');
    } catch (error) {
      // 삭제 실패 콜백 호출
      if (onError) {
        onError(error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다.'));
      }
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  return {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isDeleting
  };
};

export default useDeleteDiary;

