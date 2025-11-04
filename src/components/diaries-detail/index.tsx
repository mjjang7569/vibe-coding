'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Button } from '@/commons/components/button';
import Input from '@/commons/components/input';
import { EmotionType, emotionTypes, getEmotionConfig, getEmotionImage, getEmotionLabel } from '@/commons/constants/enum';
import { useRetrospectForm } from './hooks/index.retrospect.form.hook';
import { useUpdateDiaryForm } from './hooks/index.update.hook';

/**
 * DiariesDetail Component Props Interface
 */
export interface DiariesDetailProps {
  /**
   * 클래스명
   */
  className?: string;
  
  /**
   * 일기 ID
   */
  diaryId?: number;
  
  /**
   * 일기 제목
   */
  title?: string;
  
  /**
   * 일기 내용
   */
  content?: string;
  
  /**
   * 감정 타입
   */
  emotion?: EmotionType;
  
  /**
   * 작성일
   */
  createdAt?: string;
  
  /**
   * 삭제 버튼 클릭 핸들러
   */
  onDelete?: () => void;
  
  /**
   * 내용 복사 핸들러
   */
  onCopyContent?: () => void;
  
  /**
   * 회고 입력값
   */
  retrospectInput?: string;
  
  /**
   * 회고 입력 변경 핸들러
   */
  onRetrospectInputChange?: (value: string) => void;
  
  /**
   * 회고 항목 타입
   */
  retrospectItem?: {
    id: string;
    content: string;
    createdAt: string;
  };

  /**
   * 회고 목록
   */
  retrospectList?: {
    id: string;
    content: string;
    createdAt: string;
  }[];
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
  diaryId = 1,
  title = '이것은 타이틀 입니다.',
  content = '내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다',
  emotion = EmotionType.Happy,
  createdAt = '2024. 07. 12',
  onDelete,
  onCopyContent,
  retrospectList = [
    {
      id: '1',
      content: '3년이 지나고 다시 보니 이때가 그립다.',
      createdAt: '2024. 09. 24'
    },
    {
      id: '2', 
      content: '3년이 지나고 다시 보니 이때가 그립다.',
      createdAt: '2024. 09. 24'
    }
  ],
}) => {
  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 회고 폼 훅
  const { register, handleSubmit, isValid } = useRetrospectForm();

  // 수정 폼 훅
  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    isValid: isUpdateValid,
    handleEmotionChange,
    currentEmotion,
    handleReset
  } = useUpdateDiaryForm({
    diaryId,
    defaultEmotion: emotion,
    defaultTitle: title,
    defaultContent: content,
    onSuccess: () => {
      // 수정 성공 시 수정 모드 종료 및 페이지 새로고침
      setIsEditMode(false);
      window.location.reload();
    },
    onError: (error) => {
      console.error('수정 실패:', error);
      alert('일기 수정에 실패했습니다.');
    }
  });

  const handleCopyContent = () => {
    if (onCopyContent) {
      onCopyContent();
    } else {
      navigator.clipboard.writeText(content);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    handleReset();
    setIsEditMode(false);
  };

  return (
    <div className={`${styles.container} ${className}`} data-testid="diaries-detail-container">
      {/* Gap 영역: 1168 * 64px */}
      <div className={styles.gap64}></div>

      {!isEditMode ? (
        <>
          {/* Detail Title 영역: 1168 * 84px */}
          <section className={styles.titleSection} role="banner" aria-label="일기 제목">
            {/* 타이틀 영역 */}
            <div className={styles.titleFrame}>
              <h1 className={styles.titleText}>{title}</h1>
            </div>
            
            {/* 감정&날짜 영역 */}
            <div className={styles.emotionDateFrame}>
              <div className={styles.emotionFrame}>
                <Image
                  src={getEmotionImage(emotion, 's')}
                  alt={getEmotionLabel(emotion)}
                  width={32}
                  height={32}
                  className={styles.emotionIcon}
                />
                <span 
                  className={styles.emotionText}
                  style={{ color: getEmotionConfig(emotion).color.light }}
                >
                  {getEmotionLabel(emotion)}
                </span>
              </div>
              
              <div className={styles.dateFrame}>
                <span className={styles.dateText}>{createdAt}</span>
                <span className={styles.dateLabel}>작성</span>
              </div>
            </div>
          </section>

          {/* Gap 영역: 1168 * 24px */}
          <div className={styles.gap24}></div>

          {/* Detail Content 영역: 1168 * 169px */}
          <main className={styles.contentSection} role="main" aria-label="일기 내용">
            <div className={styles.contentArea}>
              <div className={styles.contentLabel}>내용</div>
              <div className={styles.contentTextContainer}>
                <div className={styles.contentText}>{content}</div>
              </div>
            </div>
            
            <div className={styles.copySection}>
              <button 
                className={styles.copyButton}
                onClick={handleCopyContent}
                aria-label="내용 복사"
              >
                <div className={styles.copyIcon}>
                  <Image
                    src="/icons/copy_outline_light_m.svg"
                    alt="복사"
                    width={24}
                    height={24}
                  />
                </div>
                <span className={styles.copyText}>내용 복사</span>
              </button>
            </div>
          </main>

          {/* Gap 영역: 1168 * 24px */}
          <div className={styles.gap24}></div>

          {/* Detail Footer 영역: 1168 * 56px */}
          <footer className={styles.detailFooter} role="contentinfo" aria-label="일기 푸터">
            <div className={styles.footerButtons}>
              <Button
                variant="secondary"
                theme="light"
                size="medium"
                onClick={handleEditClick}
                className="w-[50px]"
              >
                수정
              </Button>
              <Button
                variant="secondary"
                theme="light"
                size="medium"
                onClick={onDelete}
                className="w-[50px]"
              >
                삭제
              </Button>
            </div>
          </footer>
        </>
      ) : (
        <>
          {/* 수정 모드: 감정 선택 영역 */}
          <section className={styles.editSection} data-testid="emotion-radio-group">
            <div className={styles.emotionSelectLabel}>오늘 기분은 어땟나요?</div>
            <div className={styles.emotionRadioGroup}>
              {emotionTypes.map((emotionType) => (
                <label
                  key={emotionType}
                  className={styles.emotionRadioLabel}
                  data-testid={`emotion-radio-${emotionType}`}
                >
                  <input
                    type="radio"
                    value={emotionType}
                    checked={currentEmotion === emotionType}
                    onChange={() => handleEmotionChange(emotionType)}
                    className={styles.emotionRadioInput}
                  />
                  <span className={styles.emotionRadioText}>{getEmotionLabel(emotionType)}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Gap 영역: 1168 * 24px */}
          <div className={styles.gap24}></div>

          {/* 수정 모드: 제목 입력 */}
          <section className={styles.editSection}>
            <div className={styles.editLabel}>제목</div>
            <Input
              {...registerUpdate('title')}
              variant="primary"
              theme="light"
              size="medium"
              placeholder="제목을 입력하세요"
              data-testid="edit-title-input"
              className="w-full"
            />
          </section>

          {/* Gap 영역: 1168 * 24px */}
          <div className={styles.gap24}></div>

          {/* 수정 모드: 내용 입력 */}
          <section className={styles.editSection}>
            <div className={styles.editLabel}>내용</div>
            <textarea
              {...registerUpdate('content')}
              placeholder="내용을 입력하세요"
              data-testid="edit-content-input"
              className={styles.editTextarea}
              rows={6}
            />
          </section>

          {/* Gap 영역: 1168 * 24px */}
          <div className={styles.gap24}></div>

          {/* 수정 모드: 버튼 영역 */}
          <footer className={styles.editFooter}>
            <div className={styles.editButtons}>
              <Button
                variant="secondary"
                theme="light"
                size="medium"
                onClick={handleCancelEdit}
                className="w-[104px]"
              >
                취소
              </Button>
              <Button
                variant="primary"
                theme="dark"
                size="medium"
                onClick={handleUpdateSubmit}
                disabled={!isUpdateValid}
                className="w-[104px]"
              >
                수정하기
              </Button>
            </div>
          </footer>
        </>
      )}

      {/* Gap 영역: 1168 * 24px */}
      <div className={styles.gap24}></div>

      {/* Retrospect Input 영역: 1168 * 85px */}
      <section className={styles.retrospectInput} role="region" aria-label="회고 입력">
        <div className={styles.retrospectLabel}>회고</div>
        <form onSubmit={handleSubmit} className={styles.retrospectInputContainer}>
          <Input
            variant="primary"
            theme="light"
            size="medium"
            placeholder={isEditMode ? "수정중일땐 회고를 작성할 수 없어요." : "회고를 남겨보세요."}
            {...register('content')}
            data-testid="retrospect-input"
            className="flex-1"
            disabled={isEditMode}
          />
          <Button
            type="submit"
            variant="primary"
            theme="light"
            size="medium"
            disabled={!isValid || isEditMode}
            data-testid="retrospect-submit-button"
            className="w-[51px]"
          >
            입력
          </Button>
        </form>
      </section>

      {/* Gap 영역: 1168 * 16px */}
      <div className={styles.gap16}></div>

      {/* Retrospect List 영역: 1168 * 72px */}
      <section className={styles.retrospectList} role="region" aria-label="회고 목록" data-testid="retrospect-list">
        <div className={styles.retrospectItems}>
          {retrospectList.map((item, index) => (
            <div key={item.id || index} className={styles.retrospectItem} data-testid={`retrospect-item-${item.id}`}>
              <div className={styles.retrospectItemFrame}>
                <div className={styles.retrospectContent} data-testid={`retrospect-content-${item.id}`}>{item.content}</div>
                <div className={styles.retrospectDate} data-testid={`retrospect-date-${item.id}`}>[{item.createdAt}]</div>
              </div>
              {index < retrospectList.length - 1 && <div className={styles.retrospectDivider} />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiariesDetail;
