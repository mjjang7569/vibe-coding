'use client';

import { useState, useEffect } from 'react';

/**
 * 회고 데이터 타입
 */
export interface RetrospectData {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

/**
 * 회고 표시 타입
 */
export interface RetrospectItem {
  id: string;
  content: string;
  createdAt: string;
}

/**
 * 바인딩 훅의 반환 타입
 */
export interface UseRetrospectBindingReturn {
  /**
   * 회고 목록
   */
  retrospectList: RetrospectItem[];
}

/**
 * 회고 데이터 바인딩 훅
 * 
 * 로컬스토리지에서 특정 일기(diaryId)에 해당하는 회고 목록을 조회합니다.
 * diaryId가 일치하는 회고만 필터링하여 반환합니다.
 * 
 * @param diaryId - 일기 ID (URL 파라미터)
 * @returns {UseRetrospectBindingReturn} 회고 목록
 * 
 * @example
 * ```tsx
 * const { retrospectList } = useRetrospectBinding(params.id);
 * 
 * return (
 *   <DiariesDetail
 *     retrospectList={retrospectList}
 *   />
 * );
 * ```
 */
export const useRetrospectBinding = (diaryId: string): UseRetrospectBindingReturn => {
  const [retrospectList, setRetrospectList] = useState<RetrospectItem[]>([]);

  /**
   * 날짜를 YYYY. MM. DD 형식으로 포맷팅
   */
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}. ${month}. ${day}`;
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    /**
     * 로컬스토리지에서 회고 데이터 로드
     */
    const loadRetrospects = () => {
      try {
        const data = localStorage.getItem('retrospects');
        
        if (!data) {
          setRetrospectList([]);
          return;
        }

        const retrospectData: RetrospectData[] = JSON.parse(data);
        const diaryIdNumber = parseInt(diaryId, 10);
        
        // diaryId가 일치하는 회고들만 필터링
        const filteredRetrospects = retrospectData.filter(
          (retrospect) => retrospect.diaryId === diaryIdNumber
        );

        // 회고 목록을 컴포넌트에서 사용하는 형식으로 변환
        const formattedRetrospects: RetrospectItem[] = filteredRetrospects.map(
          (retrospect) => ({
            id: String(retrospect.id),
            content: retrospect.content,
            createdAt: formatDate(retrospect.createdAt),
          })
        );

        setRetrospectList(formattedRetrospects);
      } catch (error) {
        console.error('회고 데이터 로드 실패:', error);
        setRetrospectList([]);
      }
    };

    loadRetrospects();
  }, [diaryId]);

  return {
    retrospectList,
  };
};

