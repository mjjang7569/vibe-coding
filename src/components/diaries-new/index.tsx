'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Button } from '@/commons/components/button';
import Input from '@/commons/components/input';
import { EmotionType, emotionTypes, getEmotionLabel } from '@/commons/constants/enum';

/**
 * DiariesNew Component Props Interface
 */
export interface DiariesNewProps {
  /**
   * 클래스명
   */
  className?: string;
}

/**
 * DiariesNew Component
 * 
 * 새 일기 작성 화면 컴포넌트입니다.
 * 
 * @example
 * ```tsx
 * <DiariesNew />
 * ```
 */
export const DiariesNew: React.FC<DiariesNewProps> = ({
  className = '',
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(EmotionType.Happy);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClose = () => {
    // 닫기 로직
    console.log('닫기');
  };

  const handleSubmit = () => {
    // 등록하기 로직
    console.log('등록하기', { selectedEmotion, title, content });
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {/* Header 영역: full * 24px */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>일기 쓰기</h1>
      </div>

      {/* Gap 영역: full * 40px */}
      <div className={styles.gap40}></div>

      {/* Emotion Box 영역: full * 64px */}
      <div className={styles.emotionBox}>
        <p className={styles.emotionTitle}>오늘 기분은 어땟나요?</p>
        <div className={styles.emotionRadioGroup}>
          {emotionTypes.map((emotion) => (
            <label key={emotion} className={styles.radioLabel}>
              <input
                type="radio"
                name="emotion"
                value={emotion}
                checked={selectedEmotion === emotion}
                onChange={() => setSelectedEmotion(emotion)}
                className={styles.radioInput}
              />
              <span className={styles.radioCustom}>
                {selectedEmotion === emotion ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#000000" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" fill="#000000"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#333333" strokeWidth="2"/>
                  </svg>
                )}
              </span>
              <span className={styles.radioText}>{getEmotionLabel(emotion)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gap 영역: full * 40px */}
      <div className={styles.gap40}></div>

      {/* Input Title 영역: full * 76px */}
      <div className={styles.inputTitle}>
        <label className={styles.inputLabel}>제목</label>
        <Input
          variant="primary"
          size="medium"
          theme="light"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
      </div>

      {/* Gap 영역: full * 24px */}
      <div className={styles.gap24}></div>

      {/* Input Content 영역: full * 156px */}
      <div className={styles.inputContent}>
        <label className={styles.inputLabel}>내용</label>
        <textarea
          placeholder="내용을 입력해 주세요."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          className={styles.contentTextarea}
        />
      </div>

      {/* Gap 영역: full * 40px */}
      <div className={styles.gap40}></div>

      {/* Footer 영역: full * 48px */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={handleClose}
          className={styles.closeButton}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;

