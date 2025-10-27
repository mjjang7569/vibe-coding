'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { EmotionType } from '@/commons/constants/enum';
import { URL_PATHS } from '@/commons/constants/url';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

/**
 * Diary 타입 정의
 */
export interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * Form 스키마 정의
 */
const diaryFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  emotion: z.nativeEnum(EmotionType),
});

/**
 * Form 데이터 타입
 */
export type DiaryFormData = z.infer<typeof diaryFormSchema>;

/**
 * 일기 폼 훅의 반환 타입
 */
export interface UseDiaryFormReturn {
  /**
   * react-hook-form의 register 함수
   */
  register: ReturnType<typeof useForm<DiaryFormData>>['register'];
  /**
   * 폼 제출 핸들러
   */
  handleSubmit: () => void;
  /**
   * 폼 유효성 검사 상태
   */
  isValid: boolean;
  /**
   * 폼 에러 객체
   */
  errors: ReturnType<typeof useForm<DiaryFormData>>['formState']['errors'];
  /**
   * 필드 값 설정 함수
   */
  setValue: ReturnType<typeof useForm<DiaryFormData>>['setValue'];
  /**
   * 필드 값 감시 함수
   */
  watch: ReturnType<typeof useForm<DiaryFormData>>['watch'];
}

/**
 * 일기 작성 폼을 관리하는 훅
 * 
 * react-hook-form과 zod를 사용하여 폼 검증을 수행하며,
 * 로컬스토리지에 일기 데이터를 저장합니다.
 * 
 * @returns {UseDiaryFormReturn} 폼 관련 함수 및 상태
 * 
 * @example
 * ```tsx
 * const { register, handleSubmit, isValid, setValue, watch } = useDiaryForm();
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input {...register('title')} />
 *     <button type="submit" disabled={!isValid}>등록</button>
 *   </form>
 * );
 * ```
 */
export const useDiaryForm = (): UseDiaryFormReturn => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      emotion: EmotionType.Happy,
    },
  });

  // 모든 필드 값을 감시
  const title = watch('title');
  const content = watch('content');
  const emotion = watch('emotion');

  // 수동으로 isValid 계산: 모든 필드가 입력되었는지 확인
  const isValid = Boolean(
    title && title.trim().length > 0 &&
    content && content.trim().length > 0 &&
    emotion
  );

  /**
   * 로컬스토리지에서 다이어리 목록 가져오기
   */
  const getDiaries = (): Diary[] => {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem('diaries');
    if (!data) return [];
    
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  /**
   * 로컬스토리지에 다이어리 저장하기
   */
  const saveDiary = (diary: Diary): void => {
    if (typeof window === 'undefined') return;
    
    const diaries = getDiaries();
    diaries.push(diary);
    localStorage.setItem('diaries', JSON.stringify(diaries));
  };

  /**
   * 새로운 ID 생성
   */
  const generateNewId = (): number => {
    const diaries = getDiaries();
    if (diaries.length === 0) return 1;
    
    const maxId = Math.max(...diaries.map(d => d.id));
    return maxId + 1;
  };

  /**
   * 등록완료 모달을 여는 함수
   */
  const openSuccessModal = useCallback((diaryId: number) => {
    openModal(
      <Modal
        variant="info"
        actions="single"
        title="등록 완료"
        message="등록이 완료 되었습니다."
        primaryButtonText="확인"
        onPrimaryClick={() => {
          closeModal(); // 등록완료 모달 닫음
          
          // 일기쓰기 모달도 닫기 위해 closeModal을 한 번 더 호출
          setTimeout(() => {
            closeModal(); // 일기쓰기 모달 닫음
            
            // 모든 모달이 닫힌 후 상세페이지로 이동
            router.push(URL_PATHS.DIARIES.DETAIL(diaryId));
          }, 0);
        }}
      />
    );
  }, [openModal, closeModal, router]);

  /**
   * 폼 제출 핸들러
   */
  const onSubmit = (data: DiaryFormData) => {
    const newId = generateNewId();
    const newDiary: Diary = {
      id: newId,
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      createdAt: new Date().toISOString(),
    };

    saveDiary(newDiary);
    openSuccessModal(newId);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isValid,
    errors,
    setValue,
    watch,
  };
};

