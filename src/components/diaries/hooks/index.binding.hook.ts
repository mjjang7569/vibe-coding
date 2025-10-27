'use client';

import { useEffect, useState } from 'react';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 일기 데이터 타입
 */
export interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * 바인딩 훅의 반환 타입
 */
export interface UseDiariesBindingReturn {
  /**
   * 일기 목록 데이터
   */
  diaries: Diary[];
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
 * 일기 목록 데이터 바인딩 훅
 * 
 * 로컬스토리지에서 일기 목록을 가져와 반환합니다.
 * 데이터가 없으면 빈 배열을 반환합니다.
 * 
 * @returns {UseDiariesBindingReturn} 일기 목록, 로딩 상태, 날짜 포맷 함수
 * 
 * @example
 * ```tsx
 * const { diaries, isLoading, formatDate } = useDiariesBinding();
 * 
 * if (isLoading) return <div>로딩 중...</div>;
 * 
 * return (
 *   <div>
 *     {diaries.map(diary => (
 *       <DiaryCard 
 *         key={diary.id}
 *         title={diary.title}
 *         emotion={diary.emotion}
 *         date={formatDate(diary.createdAt)}
 *       />
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useDiariesBinding = (): UseDiariesBindingReturn => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
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
        const data = localStorage.getItem('diaries');
        if (data) {
          const parsedDiaries: Diary[] = JSON.parse(data);
          setDiaries(parsedDiaries);
        } else {
          // 데이터가 없으면 빈 배열
          setDiaries([]);
        }
      } catch (error) {
        console.error('일기 목록 데이터 로드 실패:', error);
        setDiaries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDiaries();
  }, []);

  return {
    diaries,
    isLoading,
    formatDate,
  };
};

