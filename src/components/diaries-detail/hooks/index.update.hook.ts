'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 일기 수정 폼 스키마
 */
const updateDiarySchema = z.object({
  emotion: z.nativeEnum(EmotionType, {
    message: '감정을 선택해주세요.'
  }),
  title: z.string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 100자 이하로 입력해주세요.'),
  content: z.string()
    .min(1, '내용을 입력해주세요.')
    .max(5000, '내용은 5000자 이하로 입력해주세요.')
});

/**
 * 일기 수정 폼 데이터 타입
 */
export type UpdateDiaryFormData = z.infer<typeof updateDiarySchema>;

/**
 * 일기 수정 Hook Props
 */
export interface UseUpdateDiaryFormProps {
  /**
   * 일기 ID
   */
  diaryId: number;
  
  /**
   * 초기 감정 값
   */
  defaultEmotion?: EmotionType;
  
  /**
   * 초기 제목 값
   */
  defaultTitle?: string;
  
  /**
   * 초기 내용 값
   */
  defaultContent?: string;
  
  /**
   * 수정 성공 시 콜백
   */
  onSuccess?: (data: UpdateDiaryFormData) => void;
  
  /**
   * 수정 실패 시 콜백
   */
  onError?: (error: Error) => void;
}

/**
 * 일기 수정 훅의 반환 타입
 */
export interface UseUpdateDiaryFormReturn {
  /**
   * react-hook-form의 register 함수
   */
  register: ReturnType<typeof useForm<UpdateDiaryFormData>>['register'];
  
  /**
   * 폼 제출 핸들러
   */
  handleSubmit: () => void;
  
  /**
   * 폼 유효성 검사 상태
   */
  isValid: boolean;
  
  /**
   * 폼 제출 중 상태
   */
  isSubmitting: boolean;
  
  /**
   * 폼 에러 객체
   */
  errors: ReturnType<typeof useForm<UpdateDiaryFormData>>['formState']['errors'];
  
  /**
   * react-hook-form의 watch 함수
   */
  watch: ReturnType<typeof useForm<UpdateDiaryFormData>>['watch'];
  
  /**
   * 감정 변경 핸들러
   */
  handleEmotionChange: (emotion: EmotionType) => void;
  
  /**
   * 폼 초기화 핸들러
   */
  handleReset: () => void;
  
  /**
   * 현재 선택된 감정
   */
  currentEmotion: EmotionType;
}

/**
 * 일기 타입 정의
 */
interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * useUpdateDiaryForm Hook
 * 
 * 일기 수정 폼을 관리하는 커스텀 훅입니다.
 * react-hook-form과 zod를 사용하여 폼 검증을 수행하며,
 * 로컬스토리지에 일기 데이터를 업데이트합니다.
 * 
 * @param props - 훅 설정 옵션
 * @returns {UseUpdateDiaryFormReturn} 폼 관련 함수 및 상태
 * 
 * @example
 * ```tsx
 * const { register, handleSubmit, isValid, isSubmitting } = useUpdateDiaryForm({
 *   diaryId: 1,
 *   defaultEmotion: EmotionType.Happy,
 *   defaultTitle: '기존 제목',
 *   defaultContent: '기존 내용',
 *   onSuccess: (data) => console.log('수정 완료:', data)
 * });
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <Input {...register('title')} />
 *     <textarea {...register('content')} />
 *     <Button type="submit" disabled={!isValid}>수정하기</Button>
 *   </form>
 * );
 * ```
 */
export const useUpdateDiaryForm = ({
  diaryId,
  defaultEmotion = EmotionType.Happy,
  defaultTitle = '',
  defaultContent = '',
  onSuccess,
  onError
}: UseUpdateDiaryFormProps): UseUpdateDiaryFormReturn => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { isValid, isSubmitting, errors },
    watch,
    setValue,
    reset
  } = useForm<UpdateDiaryFormData>({
    resolver: zodResolver(updateDiarySchema),
    mode: 'onChange',
    defaultValues: {
      emotion: defaultEmotion,
      title: defaultTitle,
      content: defaultContent
    }
  });

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = rhfHandleSubmit(async (data) => {
    try {
      // 로컬스토리지에서 기존 일기 목록 가져오기
      const diariesJson = localStorage.getItem('diaries');
      const diaries: Diary[] = diariesJson ? JSON.parse(diariesJson) : [];

      // 수정할 일기 찾기
      const targetIndex = diaries.findIndex(diary => diary.id === diaryId);
      
      if (targetIndex === -1) {
        throw new Error('일기를 찾을 수 없습니다.');
      }

      // 일기 수정 (createdAt은 유지)
      diaries[targetIndex] = {
        ...diaries[targetIndex],
        emotion: data.emotion,
        title: data.title,
        content: data.content
      };

      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(diaries));

      // 성공 콜백 호출
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      // 에러 콜백 호출
      if (onError) {
        onError(error as Error);
      } else {
        console.error('일기 수정 중 오류 발생:', error);
      }
    }
  });

  /**
   * 감정 변경 핸들러
   */
  const handleEmotionChange = (emotion: EmotionType) => {
    setValue('emotion', emotion, { shouldValidate: true });
  };

  /**
   * 폼 초기화 핸들러
   */
  const handleReset = () => {
    reset({
      emotion: defaultEmotion,
      title: defaultTitle,
      content: defaultContent
    });
  };

  return {
    register,
    handleSubmit,
    isValid,
    isSubmitting,
    errors,
    watch,
    handleEmotionChange,
    handleReset,
    currentEmotion: watch('emotion')
  };
};

