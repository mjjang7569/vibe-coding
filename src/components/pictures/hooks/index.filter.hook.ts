'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';

/**
 * 필터 옵션 타입
 */
export type FilterType = 'basic' | 'horizontal' | 'vertical';

/**
 * 필터 옵션 정의
 */
export interface FilterOption {
  value: FilterType;
  label: string;
}

/**
 * 이미지 사이즈 정의
 */
export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Filter Hook의 반환 타입
 */
export interface UsePictureFilterReturn {
  /**
   * 현재 선택된 필터 타입
   */
  selectedFilter: FilterType;
  /**
   * 필터 변경 핸들러
   */
  handleFilterChange: (value: string) => void;
  /**
   * 현재 이미지 사이즈
   */
  imageSize: ImageSize;
  /**
   * 필터 옵션 목록
   */
  filterOptions: FilterOption[];
}

/**
 * 브레이크포인트 정의 (767px)
 */
const BREAKPOINT = 767;

/**
 * 필터 타입에 따른 이미지 사이즈 매핑 (데스크탑)
 */
const FILTER_SIZE_MAP_DESKTOP: Record<FilterType, ImageSize> = {
  basic: { width: 640, height: 640 },
  horizontal: { width: 640, height: 480 },
  vertical: { width: 480, height: 640 },
};

/**
 * 필터 타입에 따른 이미지 사이즈 매핑 (모바일)
 * Figma 디자인 기준: 767px 이하
 */
const FILTER_SIZE_MAP_MOBILE: Record<FilterType, ImageSize> = {
  basic: { width: 280, height: 280 },
  horizontal: { width: 280, height: 210 },
  vertical: { width: 280, height: 372 },
};

/**
 * 필터 옵션 목록
 * 피그마 요구사항: "기본", "가로형", "세로형"
 */
const FILTER_OPTIONS: FilterOption[] = [
  { value: 'basic', label: '기본' },
  { value: 'horizontal', label: '가로형' },
  { value: 'vertical', label: '세로형' },
];

/**
 * Pictures 컴포넌트의 필터 훅
 * 
 * 강아지 사진의 사이즈를 필터링하는 기능을 제공합니다.
 * 
 * 필터 옵션:
 * - 기본: 640 x 640 (정사각형)
 * - 가로형: 640 x 480 (가로가 더 긴 직사각형)
 * - 세로형: 480 x 640 (세로가 더 긴 직사각형)
 * 
 * @returns {UsePictureFilterReturn} 필터 상태 및 핸들러
 * 
 * @example
 * ```tsx
 * const { selectedFilter, handleFilterChange, imageSize, filterOptions } = usePictureFilter();
 * 
 * <Selectbox
 *   options={filterOptions}
 *   value={selectedFilter}
 *   onChange={handleFilterChange}
 * />
 * 
 * <Image
 *   width={imageSize.width}
 *   height={imageSize.height}
 *   src={imageUrl}
 * />
 * ```
 */
export const usePictureFilter = (): UsePictureFilterReturn => {
  // 기본 필터: "기본" (640x640 데스크탑 / 280x280 모바일)
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('basic');
  
  // 윈도우 너비 상태 관리
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  /**
   * 윈도우 리사이즈 이벤트 핸들러
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    // 초기 설정
    handleResize();

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * 필터 변경 핸들러
   * Selectbox 컴포넌트의 onChange와 호환되도록 string 타입 수용
   */
  const handleFilterChange = useCallback((value: string): void => {
    if (value === 'basic' || value === 'horizontal' || value === 'vertical') {
      setSelectedFilter(value);
    }
  }, []);

  /**
   * 현재 필터에 맞는 이미지 사이즈 계산
   * useMemo를 사용하여 필터 또는 윈도우 너비가 변경될 때만 재계산
   * 브레이크포인트: 767px
   */
  const imageSize: ImageSize = useMemo(() => {
    const isMobile = windowWidth <= BREAKPOINT;
    const sizeMap = isMobile ? FILTER_SIZE_MAP_MOBILE : FILTER_SIZE_MAP_DESKTOP;
    return sizeMap[selectedFilter];
  }, [selectedFilter, windowWidth]);

  return {
    selectedFilter,
    handleFilterChange,
    imageSize,
    filterOptions: FILTER_OPTIONS,
  };
};

