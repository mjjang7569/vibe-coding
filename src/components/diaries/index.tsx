'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Selectbox } from '../../commons/components/selectbox';
import { Searchbar } from '../../commons/components/searchbar';
import { Button } from '../../commons/components/button';

/**
 * Diaries Component Props Interface
 */
export interface DiariesProps {
  /**
   * 클래스명
   */
  className?: string;
  
  /**
   * 검색 핸들러
   */
  onSearch?: (value: string) => void;
  
  /**
   * 셀렉트박스 변경 핸들러
   */
  onSelectChange?: (value: string) => void;
  
  /**
   * 일기쓰기 버튼 클릭 핸들러
   */
  onWriteDiary?: () => void;
  
  /**
   * 셀렉트박스 옵션들
   */
  selectOptions?: Array<{ value: string; label: string }>;
  
  /**
   * 셀렉트박스 현재 값
   */
  selectValue?: string;
}

/**
 * Diaries Component
 * 
 * 일기 목록을 표시하는 컴포넌트입니다.
 * Wireframe 구조에 따라 검색 영역, 메인 콘텐츠 영역으로 구성됩니다.
 * 
 * @example
 * ```tsx
 * <Diaries 
 *   onSearch={(value) => console.log(value)}
 *   selectOptions={[{value: 'all', label: '전체'}]}
 *   selectValue="all"
 * />
 * ```
 */
export const Diaries: React.FC<DiariesProps> = ({
  className = '',
  onSearch,
  onSelectChange,
  onWriteDiary,
  selectOptions = [],
  selectValue = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Gap 영역: 32px */}
      <div className={`${styles.gap} ${styles.gap32}`}></div>

      {/* Search 영역: 1168px * 48px */}
      <section className={styles.search} role="search" aria-label="일기 검색">
        <div className={styles.searchbarAndSelect}>
          {/* Selectbox 영역 */}
          <div className={styles.selectboxArea}>
            <Selectbox
              options={selectOptions}
              value={selectValue}
              placeholder="전체"
              variant="primary"
              size="medium"
              theme="light"
              onChange={onSelectChange}
              className={styles.selectboxCustom}
              data-testid="diary-category-select"
            />
          </div>
          {/* Searchbar 영역 */}
          <div className={styles.searchbarArea}>
            <Searchbar
              placeholder="검색어를 입력해 주세요."
              variant="primary"
              size="medium"
              theme="light"
              onSearch={onSearch}
              className={styles.searchbarCustom}
              data-testid="diary-search-input"
              aria-label="일기 검색어 입력"
            />
          </div>
        </div>
        {/* Button 영역 */}
        <div className={styles.writeButton}>
          <Button
            variant="primary"
            size="medium"
            theme="light"
            onClick={onWriteDiary}
            className={styles.buttonCustom}
            aria-label="새 일기 작성하기"
          >
            <Image
              src="/icons/plus_outline_light_m.svg"
              alt="추가"
              width={24}
              height={24}
            />
            일기쓰기
          </Button>
        </div>
      </section>

      {/* Gap 영역: 42px */}
      <div className={`${styles.gap} ${styles.gap42}`}></div>

      {/* Main 영역: 1168px * 936px */}
      <main className={styles.main}>
        {/* 일기 목록 콘텐츠 영역 */}
        <div className={styles.mainContent}></div>
      </main>

      {/* Gap 영역: 40px */}
      <div className={`${styles.gap} ${styles.gap40}`}></div>
    </div>
  );
};

export default Diaries;
