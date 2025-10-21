'use client';

import React from 'react';
import styles from './styles.module.css';

/**
 * DiariesDetail Component Props Interface
 */
export interface DiariesDetailProps {
  /**
   * 클래스명
   */
  className?: string;
  
  /**
   * 일기 제목
   */
  title?: string;
  
  /**
   * 일기 내용
   */
  content?: string;
  
  /**
   * 회고 입력값
   */
  retrospectInput?: string;
  
  /**
   * 회고 입력 변경 핸들러
   */
  onRetrospectInputChange?: (value: string) => void;
  
  /**
   * 회고 목록
   */
  retrospectList?: string[];
}

/**
 * DiariesDetail Component
 * 
 * 일기 상세 보기 컴포넌트입니다.
 * Wireframe 구조에 따라 제목, 내용, 푸터, 회고 입력, 회고 목록 영역으로 구성됩니다.
 * 
 * @example
 * ```tsx
 * <DiariesDetail 
 *   title="일기 제목입니다."
 *   content="일기 내용입니다."
 * />
 * ```
 */
export const DiariesDetail: React.FC<DiariesDetailProps> = ({
  className = '',
  title = '일기 제목입니다.',
  content = '일기 내용입니다.\n여러 줄의 내용을 작성할 수 있습니다.',
  retrospectInput = '',
  onRetrospectInputChange,
  retrospectList = ['회고 내용 1', '회고 내용 2'],
}) => {
  const handleRetrospectInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onRetrospectInputChange?.(e.target.value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Gap 영역: 1168 * 64px */}
      <div className={styles.gap64}></div>

      {/* Detail Title 영역: 1168 * 84px */}
      <section className={styles.detailTitle} role="banner" aria-label="일기 제목">
        <h1 className={styles.titleText}>{title}</h1>
      </section>

      {/* Gap 영역: 1168 * 24px */}
      <div className={styles.gap24}></div>

      {/* Detail Content 영역: 1168 * 169px */}
      <main className={styles.detailContent} role="main" aria-label="일기 내용">
        <div className={styles.contentText}>
          {content.split('\n').map((line, index) => (
            <p key={index} className={styles.contentLine}>
              {line}
            </p>
          ))}
        </div>
      </main>

      {/* Gap 영역: 1168 * 24px */}
      <div className={styles.gap24}></div>

      {/* Detail Footer 영역: 1168 * 56px */}
      <footer className={styles.detailFooter} role="contentinfo" aria-label="일기 푸터">
        <div className={styles.footerContent}>푸터 영역</div>
      </footer>

      {/* Gap 영역: 1168 * 24px */}
      <div className={styles.gap24}></div>

      {/* Retrospect Input 영역: 1168 * 85px */}
      <section className={styles.retrospectInput} role="region" aria-label="회고 입력">
        <textarea
          className={styles.inputTextarea}
          placeholder="회고를 입력해주세요..."
          value={retrospectInput}
          onChange={handleRetrospectInputChange}
          aria-label="회고 입력"
        />
      </section>

      {/* Gap 영역: 1168 * 16px */}
      <div className={styles.gap16}></div>

      {/* Retrospect List 영역: 1168 * 72px */}
      <section className={styles.retrospectList} role="region" aria-label="회고 목록">
        <div className={styles.retrospectItems}>
          {retrospectList.map((item, index) => (
            <div key={index} className={styles.retrospectItem}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiariesDetail;
