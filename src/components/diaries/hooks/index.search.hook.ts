'use client';

import { useState, useCallback, useEffect } from 'react';
import { DiaryItem } from '../index';

/**
 * 검색 훅의 반환 타입
 */
export interface UseSearchDiariesReturn {
  /**
   * 필터링된 일기 목록
   */
  filteredDiaries: DiaryItem[];
  /**
   * 검색 실행 함수
   */
  handleSearch: (keyword: string) => void;
  /**
   * 로딩 상태
   */
  isLoading: boolean;
  /**
   * 포맷팅된 날짜 반환 함수
   */
  formatDate: (dateString: string) => string;
}

/**
 * 일기 검색 훅
 * 
 * 로컬스토리지의 diaries에서 검색어를 기반으로 일기를 필터링합니다.
 * 검색어가 title에 포함된 일기만 반환하며, 대소문자를 구분하지 않습니다.
 * 
 * @returns {UseSearchDiariesReturn} 필터링된 일기 목록, 검색 함수, 로딩 상태, 날짜 포맷 함수
 * 
 * @example
 * ```tsx
 * const { filteredDiaries, handleSearch, isLoading, formatDate } = useSearchDiaries();
 * 
 * if (isLoading) return <div>로딩 중...</div>;
 * 
 * return (
 *   <div>
 *     <Searchbar onSearch={handleSearch} />
 *     {filteredDiaries.map(diary => (
 *       <DiaryCard 
 *         key={diary.id}
 *         title={diary.title}
 *         date={formatDate(diary.createdAt)}
 *       />
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useSearchDiaries = (): UseSearchDiariesReturn => {
  const [allDiaries, setAllDiaries] = useState<DiaryItem[]>([]);
  const [filteredDiaries, setFilteredDiaries] = useState<DiaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
     * 로컬스토리지에서 일기 목록 데이터 로드
     */
    const loadDiaries = () => {
      try {
        const stored = localStorage.getItem('diaries');
        if (stored) {
          const diaries: DiaryItem[] = JSON.parse(stored);
          setAllDiaries(diaries);
          setFilteredDiaries(diaries);
        } else {
          setAllDiaries([]);
          setFilteredDiaries([]);
        }
      } catch (error) {
        console.error('일기 목록 데이터 로드 실패:', error);
        setAllDiaries([]);
        setFilteredDiaries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDiaries();
  }, []);

  /**
   * 검색 실행 함수
   * 검색어가 title에 포함된 일기만 필터링합니다.
   * 
   * @param keyword - 검색어
   */
  const handleSearch = useCallback((keyword: string) => {
    // 검색어가 비어있으면 모든 일기를 표시
    if (!keyword || keyword.trim() === '') {
      setFilteredDiaries(allDiaries);
      return;
    }

    // 검색어를 소문자로 변환하여 대소문자 구분 없이 검색
    const searchTerm = keyword.toLowerCase().trim();

    // title에 검색어가 포함된 일기만 필터링
    const filtered = allDiaries.filter((diary) => 
      diary.title.toLowerCase().includes(searchTerm)
    );

    setFilteredDiaries(filtered);
  }, [allDiaries]);

  return {
    filteredDiaries,
    handleSearch,
    isLoading,
    formatDate,
  };
};

