'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { URL_PATHS } from '@/commons/constants/url';

/**
 * 라우팅 훅의 반환 타입
 */
export interface UseLinkRoutingReturn {
  /**
   * 일기 카드 클릭 핸들러
   */
  handleCardClick: (diaryId: number) => void;
}

/**
 * 일기 목록 페이지 라우팅 훅
 * 
 * 일기 카드 클릭 시 상세 페이지로 이동하는 기능을 제공합니다.
 * 
 * @returns {UseLinkRoutingReturn} 라우팅 관련 함수들
 * 
 * @example
 * ```tsx
 * const { handleCardClick } = useLinkRouting();
 * 
 * return (
 *   <div>
 *     {diaries.map(diary => (
 *       <DiaryCard
 *         key={diary.id}
 *         diary={diary}
 *         onClick={() => handleCardClick(diary.id)}
 *       />
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useLinkRouting = (): UseLinkRoutingReturn => {
  const router = useRouter();

  /**
   * 일기 카드 클릭 핸들러
   * 해당 일기의 상세 페이지로 이동합니다.
   * 
   * @param {number} diaryId - 일기 ID
   */
  const handleCardClick = useCallback((diaryId: number) => {
    router.push(URL_PATHS.DIARIES.DETAIL(diaryId));
  }, [router]);

  return {
    handleCardClick,
  };
};

