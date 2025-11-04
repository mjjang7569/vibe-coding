'use client';

import { useState, useCallback, useEffect } from 'react';
import { DiaryItem } from '../index';
import { EmotionType, getEmotionLabel } from '../../../commons/constants/enum';

/**
 * 필터 옵션 인터페이스
 */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * 필터 훅의 반환 타입
 */
export interface UseFilterDiariesReturn {
  /**
   * 필터링된 일기 목록
   */
  filteredDiaries: DiaryItem[];
  
  /**
   * 검색어 상태
   */
  searchKeyword: string;
  
  /**
   * 선택된 emotion 필터
   */
  selectedEmotion: string;
  
  /**
   * 필터 옵션 목록
   */
  filterOptions: FilterOption[];
  
  /**
   * emotion 필터 변경 함수
   */
  handleEmotionFilter: (emotion: string) => void;
  
  /**
   * 검색어 변경 함수
   */
  handleSearchChange: (keyword: string) => void;
  
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
 * 일기 필터 훅
 * 
 * 로컬스토리지의 diaries에서 emotion과 검색어를 기반으로 일기를 필터링합니다.
 * emotion 필터와 검색어 필터를 동시에 적용할 수 있습니다.
 * 
 * @returns {UseFilterDiariesReturn} 필터링된 일기 목록, 필터 함수들, 로딩 상태
 * 
 * @example
 * ```tsx
 * const { 
 *   filteredDiaries, 
 *   filterOptions, 
 *   selectedEmotion,
 *   handleEmotionFilter,
 *   handleSearchChange
 * } = useFilterDiaries();
 * 
 * return (
 *   <div>
 *     <Selectbox 
 *       options={filterOptions} 
 *       value={selectedEmotion}
 *       onChange={handleEmotionFilter} 
 *     />
 *     <Searchbar onChange={(e) => handleSearchChange(e.target.value)} />
 *     {filteredDiaries.map(diary => (
 *       <DiaryCard key={diary.id} {...diary} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useFilterDiaries = (): UseFilterDiariesReturn => {
  const [allDiaries, setAllDiaries] = useState<DiaryItem[]>([]);
  const [filteredDiaries, setFilteredDiaries] = useState<DiaryItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 필터 옵션 목록 생성
   * "전체" 옵션과 enum.ts의 emotion 타입들을 포함
   */
  const filterOptions: FilterOption[] = [
    { value: 'all', label: '전체' },
    { value: EmotionType.Happy, label: getEmotionLabel(EmotionType.Happy) },
    { value: EmotionType.Sad, label: getEmotionLabel(EmotionType.Sad) },
    { value: EmotionType.Angry, label: getEmotionLabel(EmotionType.Angry) },
    { value: EmotionType.Surprise, label: getEmotionLabel(EmotionType.Surprise) },
    { value: EmotionType.Etc, label: getEmotionLabel(EmotionType.Etc) }
  ];

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

  /**
   * 로컬스토리지에서 일기 목록 데이터 로드
   */
  useEffect(() => {
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
   * 필터링 적용 함수
   * emotion 필터와 검색어 필터를 모두 적용합니다.
   */
  const applyFilters = useCallback((diaries: DiaryItem[], emotion: string, keyword: string) => {
    let result = [...diaries];

    // emotion 필터 적용
    if (emotion !== 'all') {
      result = result.filter(diary => diary.emotion === emotion);
    }

    // 검색어 필터 적용
    if (keyword && keyword.trim() !== '') {
      const searchTerm = keyword.toLowerCase().trim();
      result = result.filter(diary => 
        diary.title.toLowerCase().includes(searchTerm)
      );
    }

    return result;
  }, []);

  /**
   * emotion 필터 변경 시 호출
   */
  useEffect(() => {
    const filtered = applyFilters(allDiaries, selectedEmotion, searchKeyword);
    setFilteredDiaries(filtered);
  }, [allDiaries, selectedEmotion, searchKeyword, applyFilters]);

  /**
   * emotion 필터 변경 핸들러
   * 
   * @param emotion - 선택된 emotion 값 ('all' 또는 EmotionType)
   */
  const handleEmotionFilter = useCallback((emotion: string) => {
    setSelectedEmotion(emotion);
  }, []);

  /**
   * 검색어 변경 핸들러
   * 
   * @param keyword - 검색어
   */
  const handleSearchChange = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
  }, []);

  return {
    filteredDiaries,
    searchKeyword,
    selectedEmotion,
    filterOptions,
    handleEmotionFilter,
    handleSearchChange,
    isLoading,
    formatDate,
  };
};

