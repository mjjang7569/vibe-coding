'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Selectbox } from '../../commons/components/selectbox';
import { Searchbar } from '../../commons/components/searchbar';
import { Button } from '../../commons/components/button';
import { Pagination } from '../../commons/components/pagination';
import { EmotionType, getEmotionConfig } from '../../commons/constants/enum';
import { colorTokens } from '../../commons/constants/color';
import { useLinkModal } from './hooks/index.link.modal.hook';

/**
 * 일기 데이터 인터페이스
 */
export interface DiaryItem {
  id: string;
  title: string;
  date: string;
  emotion: EmotionType;
}

/**
 * Diaries Component Props Interface
 */
export interface DiariesProps {
  /**
   * 클래스명
   */
  className?: string;
  
  /**
   * 현재 페이지 번호
   */
  currentPage?: number;
  
  /**
   * 전체 페이지 수
   */
  totalPages?: number;
  
  /**
   * 검색 핸들러
   */
  onSearch?: (value: string) => void;
  
  /**
   * 셀렉트박스 변경 핸들러
   */
  onSelectChange?: (value: string) => void;
  
  /**
   * 페이지 변경 핸들러
   */
  onPageChange?: (page: number) => void;
  
  
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
/**
 * Mock 데이터 생성 - 피그마 디자인과 동일한 순서로 생성
 */
const generateMockDiaries = (): DiaryItem[] => {
  // 피그마에서 확인한 정확한 순서와 데이터
  const mockDiariesData = [
    // 첫 번째 행
    { emotion: EmotionType.Sad, title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', id: 'sad-1' },
    { emotion: EmotionType.Surprise, title: '타이틀 영역 입니다.', id: 'surprise-1' },
    { emotion: EmotionType.Angry, title: '타이틀 영역 입니다.', id: 'angry-1' },
    { emotion: EmotionType.Happy, title: '타이틀 영역 입니다.', id: 'happy-1' },
    
    // 두 번째 행
    { emotion: EmotionType.Etc, title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', id: 'etc-1' },
    { emotion: EmotionType.Surprise, title: '타이틀 영역 입니다.', id: 'surprise-2' },
    { emotion: EmotionType.Angry, title: '타이틀 영역 입니다.', id: 'angry-2' },
    { emotion: EmotionType.Happy, title: '타이틀 영역 입니다.', id: 'happy-2' },
    
    // 세 번째 행
    { emotion: EmotionType.Sad, title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', id: 'sad-2' },
    { emotion: EmotionType.Surprise, title: '타이틀 영역 입니다.', id: 'surprise-3' },
    { emotion: EmotionType.Angry, title: '타이틀 영역 입니다.', id: 'angry-3' },
    { emotion: EmotionType.Happy, title: '타이틀 영역 입니다.', id: 'happy-3' },
  ];
  
  return mockDiariesData.map(item => ({
    ...item,
    date: '2024. 03. 12',
  }));
};

/**
 * 감정별 이미지 경로 가져오기 함수 (핵심 수정 요구사항)
 */
const getEmotionImagePath = (emotion: EmotionType): string => {
  const imagePathMap: Record<EmotionType, string> = {
    [EmotionType.Happy]: '/images/emotion-happy-m.png',
    [EmotionType.Sad]: '/images/emotion-sad-m.png',
    [EmotionType.Angry]: '/images/emotion-angry-m.png',
    [EmotionType.Surprise]: '/images/emotion-surprise-m.png',
    [EmotionType.Etc]: '/images/emotion-etc-m.png',
  };
  return imagePathMap[emotion];
};

/**
 * 일기 카드 컴포넌트
 */
const DiaryCard: React.FC<{ diary: DiaryItem }> = ({ diary }) => {
  const emotionConfig = getEmotionConfig(diary.emotion);
  
  // "기타" 감정의 색상을 피그마와 일치하도록 수정
  const getEmotionTextColor = (emotion: EmotionType): string => {
    if (emotion === EmotionType.Etc) {
      return colorTokens.secondary[600].light; // #9333ea - 피그마의 #a229ed와 유사
    }
    return emotionConfig.color.light;
  };
  
  return (
    <div className={styles.diaryCard}>
      <div className={styles.cardImage}>
        <Image
          src={getEmotionImagePath(diary.emotion)}
          alt={emotionConfig.label}
          width={274}
          height={208}
          className={styles.cardImageContent}
        />
        <button className={styles.closeButton} aria-label="닫기">
          <Image
            src="/images/close_outline_light_m.svg"
            alt="닫기"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span 
            className={styles.emotionText}
            style={{ color: getEmotionTextColor(diary.emotion) }}
          >
            {emotionConfig.label}
          </span>
          <span className={styles.dateText}>{diary.date}</span>
        </div>
        <div className={styles.cardTitle}>
          <h3 className={styles.titleText}>{diary.title}</h3>
        </div>
      </div>
    </div>
  );
};

export const Diaries: React.FC<DiariesProps> = ({
  className = '',
  currentPage = 1,
  totalPages = 10,
  onSearch,
  onSelectChange,
  onPageChange,
  selectOptions = [],
  selectValue = '',
}) => {
  const mockDiaries = generateMockDiaries();
  const { openWriteDiaryModal } = useLinkModal();
  
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
            onClick={openWriteDiaryModal}
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
        <div className={styles.mainContent}>
          <div className={styles.diaryGrid}>
            {mockDiaries.map((diary) => (
              <DiaryCard key={diary.id} diary={diary} />
            ))}
          </div>
        </div>
      </main>

      {/* Gap 영역: 40px */}
      <div className={`${styles.gap} ${styles.gap40}`}></div>

      {/* Pagination 영역 */}
      <div className={styles.paginationSection}>
        <Pagination
          variant="primary"
          theme="light"
          size="medium"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
          className={styles.paginationCustom}
        />
      </div>

      {/* Gap 영역: 40px */}
      <div className={`${styles.gap} ${styles.gap40}`}></div>
    </div>
  );
};

export default Diaries;
