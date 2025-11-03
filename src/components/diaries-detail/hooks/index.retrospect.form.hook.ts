'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams } from 'next/navigation';

/**
 * Retrospect 데이터 타입
 */
export interface Retrospect {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

/**
 * Retrospect Form Schema
 */
const retrospectFormSchema = z.object({
  content: z.string().min(1, '회고 내용을 입력해주세요.'),
});

/**
 * Retrospect Form Data Type
 */
export type RetrospectFormData = z.infer<typeof retrospectFormSchema>;

/**
 * 회고 폼 훅의 반환 타입
 */
export interface UseRetrospectFormReturn {
  /**
   * react-hook-form의 register 함수
   */
  register: ReturnType<typeof useForm<RetrospectFormData>>['register'];
  /**
   * 폼 제출 핸들러
   */
  handleSubmit: (e: React.FormEvent) => void;
  /**
   * 폼 유효성 검사 상태
   */
  isValid: boolean;
  /**
   * 폼 에러 객체
   */
  errors: ReturnType<typeof useForm<RetrospectFormData>>['formState']['errors'];
}

/**
 * useRetrospectForm Hook
 * 
 * 회고 등록 폼을 관리하는 커스텀 훅입니다.
 * react-hook-form과 zod를 사용하여 폼 검증을 수행하며,
 * 로컬스토리지에 회고 데이터를 저장합니다.
 * 
 * @returns {UseRetrospectFormReturn} 폼 관련 함수 및 상태
 * 
 * @example
 * ```tsx
 * const { register, handleSubmit, isValid } = useRetrospectForm();
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <Input {...register('content')} data-testid="retrospect-input" />
 *     <Button type="submit" disabled={!isValid}>입력</Button>
 *   </form>
 * );
 * ```
 */
export const useRetrospectForm = (): UseRetrospectFormReturn => {
  const params = useParams();
  const diaryId = Number(params.id);

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<RetrospectFormData>({
    resolver: zodResolver(retrospectFormSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  /**
   * 회고 등록 핸들러
   */
  const onSubmit = (data: RetrospectFormData) => {
    try {
      // 로컬스토리지에서 기존 retrospects 가져오기
      const retrospectsData = localStorage.getItem('retrospects');
      const existingRetrospects: Retrospect[] = retrospectsData 
        ? JSON.parse(retrospectsData) 
        : [];

      // 새로운 ID 계산 (기존 retrospects가 있으면 가장 큰 id + 1, 없으면 1)
      const newId = existingRetrospects.length > 0
        ? Math.max(...existingRetrospects.map(r => r.id)) + 1
        : 1;

      // 새로운 회고 생성
      const newRetrospect: Retrospect = {
        id: newId,
        content: data.content,
        diaryId: diaryId,
        createdAt: new Date().toISOString(),
      };

      // 기존 retrospects에 추가
      const updatedRetrospects = [...existingRetrospects, newRetrospect];

      // 로컬스토리지에 저장
      localStorage.setItem('retrospects', JSON.stringify(updatedRetrospects));

      // 폼 리셋
      reset();

      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error('회고 등록 중 오류 발생:', error);
    }
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hookFormHandleSubmit(onSubmit)(e);
  };

  return {
    register,
    handleSubmit,
    isValid,
    errors,
  };
};

