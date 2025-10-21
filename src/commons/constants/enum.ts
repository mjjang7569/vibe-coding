/**
 * Emotion Enum
 * 프로젝트에서 사용되는 감정 타입 정의
 */

import { colorTokens } from './color';

/**
 * 감정 타입 Enum
 */
export enum EmotionType {
  Happy = 'Happy',
  Sad = 'Sad',
  Angry = 'Angry',
  Surprise = 'Surprise',
  Etc = 'Etc',
}

/**
 * 감정 설정 타입 정의
 */
export interface EmotionConfig {
  label: string;
  images: {
    m: string;
    s: string;
  };
  color: {
    light: string;
    dark: string;
  };
}

/**
 * 감정별 설정 맵
 * 각 감정마다 라벨, 이미지, 색상 정보를 포함
 */
export const emotionConfigs: Record<EmotionType, EmotionConfig> = {
  [EmotionType.Happy]: {
    label: '행복해요',
    images: {
      m: '/images/emotion-happy-m.png',
      s: '/images/emotion-happy-s.png',
    },
    color: colorTokens.error.DEFAULT, // red60
  },
  [EmotionType.Sad]: {
    label: '슬퍼요',
    images: {
      m: '/images/emotion-sad-m.png',
      s: '/images/emotion-sad-s.png',
    },
    color: colorTokens.info.DEFAULT, // blue60
  },
  [EmotionType.Angry]: {
    label: '화나요',
    images: {
      m: '/images/emotion-angry-m.png',
      s: '/images/emotion-angry-s.png',
    },
    color: colorTokens.gray[600], // gray60
  },
  [EmotionType.Surprise]: {
    label: '놀랐어요',
    images: {
      m: '/images/emotion-surprise-m.png',
      s: '/images/emotion-surprise-s.png',
    },
    color: colorTokens.warning.DEFAULT, // yellow60
  },
  [EmotionType.Etc]: {
    label: '기타',
    images: {
      m: '/images/emotion-etc-m.png',
      s: '/images/emotion-etc-s.png',
    },
    color: colorTokens.success.DEFAULT, // green60
  },
};

/**
 * 감정 타입 배열
 * 순회가 필요한 경우 사용
 */
export const emotionTypes = Object.values(EmotionType);

/**
 * 감정 설정 가져오기 헬퍼 함수
 */
export const getEmotionConfig = (type: EmotionType): EmotionConfig => {
  return emotionConfigs[type];
};

/**
 * 감정 라벨 가져오기 헬퍼 함수
 */
export const getEmotionLabel = (type: EmotionType): string => {
  return emotionConfigs[type].label;
};

/**
 * 감정 이미지 가져오기 헬퍼 함수
 */
export const getEmotionImage = (type: EmotionType, size: 'm' | 's'): string => {
  return emotionConfigs[type].images[size];
};

/**
 * 감정 색상 가져오기 헬퍼 함수
 */
export const getEmotionColor = (type: EmotionType, mode: 'light' | 'dark' = 'light'): string => {
  return emotionConfigs[type].color[mode];
};



