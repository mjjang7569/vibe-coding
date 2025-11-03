'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Selectbox } from '../../commons/components/selectbox';
import { usePictureBinding } from './hooks/index.binding.hook';
import { usePictureFilter } from './hooks/index.filter.hook';

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
 * 스플래시 스크린 컴포넌트 Props
 */
interface SplashScreenProps {
  width: number;
  height: number;
}

/**
 * 스플래시 스크린 컴포넌트
 * 
 * 이미지 로딩 중에 표시되는 스켈레톤 UI입니다.
 * 회색 배경에 30도 기울어진 흰 세로줄이 좌우로 이동하는 애니메이션을 표시합니다.
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ width, height }) => {
  return (
    <div 
      className={styles.splashScreen}
      data-testid="picture-splash-screen"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
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
  // Binding Hook 사용
  const { pictures, isLoading, isError, observerRef } = usePictureBinding();
  
  // Filter Hook 사용
  const { selectedFilter, handleFilterChange, imageSize, filterOptions } = usePictureFilter();

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
              onChange={handleFilterChange}
              variant="primary"
              size="medium"
              theme="light"
              placeholder="필터 선택"
              className={styles.selectboxCustom}
              data-testid="filter-selectbox"
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
                  <SplashScreen 
                    key={`splash-${index}`}
                    width={imageSize.width}
                    height={imageSize.height}
                  />
                ))}
              </>
            )}

            {/* 사진 목록 */}
            {pictures.map((picture, index) => (
              <div 
                key={picture.id} 
                className={styles.pictureItem}
                data-testid="picture-item"
                style={{
                  width: `${imageSize.width}px`,
                  height: `${imageSize.height}px`,
                }}
              >
                <Image
                  src={picture.imageUrl}
                  alt={picture.alt}
                  width={imageSize.width}
                  height={imageSize.height}
                  className={styles.pictureImage}
                  unoptimized // Dog CEO API는 외부 도메인이므로 unoptimized 사용
                />
                {/* 마지막에서 2번째 아이템에 observer 부착 */}
                {index === pictures.length - 2 && (
                  <div ref={observerRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1px', height: '1px' }} />
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
