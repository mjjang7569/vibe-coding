'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Selectbox } from '../../commons/components/selectbox';

/**
 * Picture Data Interface
 */
export interface PictureItem {
  id: number;
  imageUrl: string;
  alt: string;
}

/**
 * Pictures Component Props Interface
 */
export interface PicturesProps {
  /**
   * 클래스명
   */
  className?: string;
}

/**
 * Mock 데이터 생성 함수
 */
const generateMockPictures = (count: number): PictureItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    imageUrl: '/images/dog-1.jpg',
    alt: `강아지 사진 ${index + 1}`,
  }));
};

/**
 * Pictures Component
 * 
 * 사진 목록을 표시하는 컴포넌트입니다.
 * Wireframe 구조에 따라 필터 영역, 메인 콘텐츠 영역으로 구성됩니다.
 * 
 * @example
 * ```tsx
 * <Pictures />
 * ```
 */
export const Pictures: React.FC<PicturesProps> = ({
  className = '',
}) => {
  // Filter 옵션 (피그마: "기본")
  const filterOptions = [
    { value: 'basic', label: '기본' },
    { value: 'recent', label: '최근' },
    { value: 'popular', label: '인기' },
    { value: 'favorite', label: '즐겨찾기' },
  ];

  const [selectedFilter, setSelectedFilter] = useState('basic');

  // Mock 데이터: 10개의 사진 (피그마와 일치)
  const pictures = generateMockPictures(10);

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Gap 영역: 32px */}
      <div className={`${styles.gap} ${styles.gap32}`}></div>

      {/* Filter 영역: 1168px * 48px */}
      <section className={styles.filter} role="search" aria-label="사진 필터">
        <div className={styles.filterContent}>
          <div className={styles.selectboxArea}>
            <Selectbox
              options={filterOptions}
              value={selectedFilter}
              onChange={setSelectedFilter}
              variant="primary"
              size="medium"
              theme="light"
              placeholder="필터 선택"
              className={styles.selectboxCustom}
            />
          </div>
        </div>
      </section>

      {/* Gap 영역: 42px */}
      <div className={`${styles.gap} ${styles.gap42}`}></div>

      {/* Main 영역: 1168px * auto */}
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.pictureGrid}>
            {pictures.map((picture) => (
              <div key={picture.id} className={styles.pictureItem}>
                <Image
                  src={picture.imageUrl}
                  alt={picture.alt}
                  width={640}
                  height={640}
                  className={styles.pictureImage}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pictures;
