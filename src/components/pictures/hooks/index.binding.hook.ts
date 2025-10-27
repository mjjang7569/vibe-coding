'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Dog CEO API 응답 타입
 */
export interface DogApiResponse {
  message: string[];
  status: string;
}

/**
 * Picture Item 타입
 */
export interface PictureItem {
  id: string;
  imageUrl: string;
  alt: string;
}

/**
 * Binding Hook의 반환 타입
 */
export interface UsePictureBindingReturn {
  /**
   * 사진 목록 (평탄화된 배열)
   */
  pictures: PictureItem[];
  /**
   * 로딩 상태
   */
  isLoading: boolean;
  /**
   * 에러 상태
   */
  isError: boolean;
  /**
   * 다음 페이지를 가져오는 함수
   */
  fetchNextPage: () => void;
  /**
   * 다음 페이지가 있는지 여부
   */
  hasNextPage: boolean;
  /**
   * 다음 페이지를 가져오는 중인지 여부
   */
  isFetchingNextPage: boolean;
  /**
   * 무한 스크롤 트리거를 위한 ref
   */
  observerRef: (node: HTMLDivElement | null) => void;
}

/**
 * Dog CEO API에서 강아지 사진을 가져오는 함수
 */
const fetchDogPictures = async (): Promise<DogApiResponse> => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random/6');
  
  if (!response.ok) {
    throw new Error('Failed to fetch dog pictures');
  }
  
  return response.json();
};

/**
 * API 응답을 PictureItem 배열로 변환
 */
const transformToPictureItems = (urls: string[], pageIndex: number): PictureItem[] => {
  return urls.map((url, index) => ({
    id: `${pageIndex}-${index}`,
    imageUrl: url,
    alt: `강아지 사진 ${pageIndex * 6 + index + 1}`,
  }));
};

/**
 * Pictures 컴포넌트의 데이터 바인딩 훅
 * 
 * Dog CEO API를 사용하여 강아지 사진을 로드하고,
 * 무한 스크롤 기능을 제공합니다.
 * 
 * @returns {UsePictureBindingReturn} 사진 목록, 로딩 상태, 무한 스크롤 관련 함수
 * 
 * @example
 * ```tsx
 * const { pictures, isLoading, observerRef } = usePictureBinding();
 * 
 * if (isLoading) return <div>로딩 중...</div>;
 * 
 * return (
 *   <div>
 *     {pictures.map((picture) => (
 *       <img key={picture.id} src={picture.imageUrl} alt={picture.alt} />
 *     ))}
 *     <div ref={observerRef} />
 *   </div>
 * );
 * ```
 */
export const usePictureBinding = (): UsePictureBindingReturn => {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  /**
   * useInfiniteQuery를 사용한 무한 스크롤 구현
   */
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['dogPictures'],
    queryFn: fetchDogPictures,
    getNextPageParam: (lastPage, allPages) => {
      // 항상 다음 페이지가 있다고 가정 (무한 스크롤)
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5분
  });

  /**
   * Intersection Observer를 사용한 무한 스크롤
   * 마지막 2개 아이템만 남았을 때 추가 데이터 로드
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '400px', // 400px 전에 미리 로드 (2개 아이템 높이 정도)
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  /**
   * 모든 페이지의 데이터를 평탄화하여 PictureItem 배열로 변환
   */
  const pictures: PictureItem[] =
    data?.pages.flatMap((page, pageIndex) =>
      transformToPictureItems(page.message, pageIndex)
    ) ?? [];

  /**
   * Observer ref 콜백
   * Intersection Observer의 타겟 요소를 설정합니다.
   * 
   * @param {HTMLDivElement | null} node - 관찰할 DOM 요소
   */
  const observerRef = useCallback((node: HTMLDivElement | null) => {
    observerTarget.current = node;
  }, []);

  return {
    pictures,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage: true, // 항상 다음 페이지가 있다고 가정
    isFetchingNextPage,
    observerRef,
  };
};

