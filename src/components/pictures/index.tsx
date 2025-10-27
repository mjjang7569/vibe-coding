'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Selectbox } from '../../commons/components/selectbox';
import { usePictureBinding } from './hooks/index.binding.hook';

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
 * 스플래시 스크린 컴포넌트
 * 
 * 이미지 로딩 중에 표시되는 스켈레톤 UI입니다.
 * 회색 배경에 30도 기울어진 흰 세로줄이 좌우로 이동하는 애니메이션을 표시합니다.
 */
const SplashScreen: React.FC = () => {
  return (
    <div 
      className={styles.splashScreen}
      data-testid="picture-splash-screen"
    >
      <div className={styles.splashScreenShine}></div>
    </div>
  );
};

/**
 * Pictures Component
 * 
 * 사진 목록을 표시하는 컴포넌트입니다.
 * Wireframe 구조에 따라 필터 영역, 메인 콘텐츠 영역으로 구성됩니다.
 * Dog CEO API를 통해 실시간으로 강아지 사진을 로드하고 무한 스크롤을 지원합니다.
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

  // Binding Hook 사용
  const { pictures, isLoading, isError, observerRef } = usePictureBinding();

  return (
    <div 
      className={`${styles.container} ${className}`}
      data-testid="pictures-container"
    >
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
          {/* 에러 상태 */}
          {isError && (
            <div className={styles.errorMessage}>
              사진을 불러오는데 실패했습니다.
            </div>
          )}

          <div className={styles.pictureGrid}>
            {/* 로딩 중: 스플래시 스크린 6개 표시 */}
            {isLoading && pictures.length === 0 && (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <SplashScreen key={`splash-${index}`} />
                ))}
              </>
            )}

            {/* 사진 목록 */}
            {pictures.map((picture, index) => (
              <div 
                key={picture.id} 
                className={styles.pictureItem}
                data-testid="picture-item"
              >
                <Image
                  src={picture.imageUrl}
                  alt={picture.alt}
                  width={640}
                  height={640}
                  className={styles.pictureImage}
                  unoptimized // Dog CEO API는 외부 도메인이므로 unoptimized 사용
                />
                {/* 마지막에서 2번째 아이템에 observer 부착 */}
                {index === pictures.length - 2 && (
                  <div ref={observerRef} style={{ position: 'absolute', bottom: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pictures;
