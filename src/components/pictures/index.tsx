'use client';

import React from 'react';
import styles from './styles.module.css';

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
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Gap 영역: 32px */}
      <div className={`${styles.gap} ${styles.gap32}`}></div>

      {/* Filter 영역: 1168px * 48px */}
      <section className={styles.filter} role="search" aria-label="사진 필터">
        <div className={styles.filterContent}>
          {/* Filter Content */}
        </div>
      </section>

      {/* Gap 영역: 42px */}
      <div className={`${styles.gap} ${styles.gap42}`}></div>

      {/* Main 영역: 1168px * auto */}
      <main className={styles.main}>
        <div className={styles.mainContent}>
          {/* Main Content */}
        </div>
      </main>
    </div>
  );
};

export default Pictures;
