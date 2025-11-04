'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { DiaryItem } from '../index';

/**
 * 페이지당 표시할 일기 개수
 * 3행 4열 = 12개
 */
const ITEMS_PER_PAGE = 12;

/**
 * 페이지네이션 훅 반환 타입
 */
export interface UsePaginationReturn {
  /**
   * 현재 페이지에 표시될 일기 목록
   */
  paginatedDiaries: DiaryItem[];
  
  /**
   * 현재 페이지 번호
   */
  currentPage: number;
  
  /**
   * 전체 페이지 수
   */
  totalPages: number;
  
  /**
   * 페이지 변경 함수
   */
  handlePageChange: (page: number) => void;
  
  /**
   * 페이지 초기화 함수 (필터/검색 변경 시 사용)
   */
  resetPage: () => void;
}

/**
 * 페이지네이션 훅
 * 
 * 일기 목록을 페이지 단위로 분할하여 제공합니다.
 * 한 페이지에 12개(3행 4열)씩 표시됩니다.
 * 
 * @param diaries - 페이지네이션을 적용할 일기 목록
 * @returns {UsePaginationReturn} 페이지네이션된 일기 목록과 관련 함수들
 * 
 * @example
 * ```tsx
 * const { filteredDiaries } = useFilterDiaries();
 * const { 
 *   paginatedDiaries, 
 *   currentPage, 
 *   totalPages, 
 *   handlePageChange 
 * } = usePagination(filteredDiaries);
 * 
 * return (
 *   <>
 *     <DiaryGrid diaries={paginatedDiaries} />
 *     <Pagination 
 *       currentPage={currentPage} 
 *       totalPages={totalPages} 
 *       onPageChange={handlePageChange} 
 *     />
 *   </>
 * );
 * ```
 */
export const usePagination = (diaries: DiaryItem[]): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * 전체 페이지 수 계산
   */
  const totalPages = useMemo(() => {
    if (diaries.length === 0) {
      return 1;
    }
    const calculated = Math.ceil(diaries.length / ITEMS_PER_PAGE);
    console.log('[usePagination] totalPages 계산:', {
      diariesCount: diaries.length,
      itemsPerPage: ITEMS_PER_PAGE,
      totalPages: calculated
    });
    return calculated;
  }, [diaries.length]);

  /**
   * totalPages가 변경되었을 때 currentPage가 범위를 벗어나면 조정
   */
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      console.log('[usePagination] currentPage 범위 초과, 조정:', currentPage, '->', totalPages);
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  /**
   * 현재 페이지에 표시될 일기 목록
   */
  const paginatedDiaries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return diaries.slice(startIndex, endIndex);
  }, [diaries, currentPage]);

  /**
   * 페이지 변경 핸들러
   * 
   * @param page - 이동할 페이지 번호
   */
  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  }, [totalPages]);

  /**
   * 페이지 초기화 함수
   * 필터나 검색 조건이 변경되면 1페이지로 리셋
   */
  const resetPage = useCallback(() => {
    console.log('[usePagination] resetPage 호출됨');
    setCurrentPage(1);
  }, []);

  return {
    paginatedDiaries,
    currentPage,
    totalPages,
    handlePageChange,
    resetPage,
  };
};

