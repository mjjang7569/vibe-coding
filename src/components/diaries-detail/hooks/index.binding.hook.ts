'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmotionType } from '@/commons/constants/enum';
import { URL_PATHS } from '@/commons/constants/url';

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
export interface UseDiaryBindingReturn {
  /**
   * 일기 데이터
   */
  diary: Diary | null;
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
 * 일기 상세 데이터 바인딩 훅
 * 
 * URL의 동적 파라미터 [id]를 추출하여 로컬스토리지에서 해당 일기를 찾아 반환합니다.
 * 일기를 찾지 못하거나 로컬스토리지에 데이터가 없으면 목록 페이지로 리다이렉트합니다.
 * 
 * @param id - 일기 ID (URL 파라미터)
 * @returns {UseDiaryBindingReturn} 일기 데이터, 로딩 상태, 날짜 포맷 함수
 * 
 * @example
 * ```tsx
 * const { diary, isLoading, formatDate } = useDiaryBinding(params.id);
 * 
 * if (isLoading) return <div>로딩 중...</div>;
 * if (!diary) return null;
 * 
 * return (
 *   <DiariesDetail
 *     title={diary.title}
 *     content={diary.content}
 *     emotion={diary.emotion}
 *     createdAt={formatDate(diary.createdAt)}
 *   />
 * );
 * ```
 */
export const useDiaryBinding = (id: string): UseDiaryBindingReturn => {
  const router = useRouter();
  const [diary, setDiary] = useState<Diary | null>(null);
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
     * 로컬스토리지에서 일기 데이터 로드
     */
    const loadDiary = () => {
      try {
        const data = localStorage.getItem('diaries');
        if (data) {
          const diaries: Diary[] = JSON.parse(data);
          const foundDiary = diaries.find((d) => d.id === Number(id));
          
          if (foundDiary) {
            setDiary(foundDiary);
          } else {
            // 일기를 찾지 못하면 목록 페이지로 이동
            router.push(URL_PATHS.DIARIES.LIST);
          }
        } else {
          // 데이터가 없으면 목록 페이지로 이동
          router.push(URL_PATHS.DIARIES.LIST);
        }
      } catch (error) {
        console.error('일기 데이터 로드 실패:', error);
        router.push(URL_PATHS.DIARIES.LIST);
      } finally {
        setIsLoading(false);
      }
    };

    loadDiary();
  }, [id, router]);

  return {
    diary,
    isLoading,
    formatDate,
  };
};


