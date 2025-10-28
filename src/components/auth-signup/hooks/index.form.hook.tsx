'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { URL_PATHS } from '@/commons/constants/url';

/**
 * GraphQL API Endpoint
 */
const GRAPHQL_API_URL = 'https://main-practice.codebootcamp.co.kr/graphql';

/**
 * CreateUser Input 타입
 */
interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

/**
 * CreateUser Response 타입
 */
interface CreateUserResponse {
  data: {
    createUser: {
      _id: string;
    };
  };
}

/**
 * Form 스키마 정의
 * 
 * 검증 조건:
 * - email: '@' 포함
 * - password: 영문 + 숫자 포함 8자리 이상
 * - passwordConfirm: password와 동일
 * - name: 최소 1글자 이상
 */
const signupFormSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .refine((email) => email.includes('@'), {
      message: '올바른 이메일 형식이 아닙니다. (@를 포함해주세요)',
    }),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자리 이상이어야 합니다.')
    .refine(
      (password) => {
        // 영문과 숫자를 모두 포함하는지 확인
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return hasLetter && hasNumber;
      },
      {
        message: '비밀번호는 영문과 숫자를 모두 포함해야 합니다.',
      }
    ),
  passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  name: z.string().min(1, '이름을 입력해주세요.'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
});

/**
 * Form 데이터 타입
 */
export type SignupFormData = z.infer<typeof signupFormSchema>;

/**
 * 회원가입 폼 훅의 반환 타입
 */
export interface UseSignupFormReturn {
  /**
   * react-hook-form의 register 함수
   */
  register: ReturnType<typeof useForm<SignupFormData>>['register'];
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
  errors: ReturnType<typeof useForm<SignupFormData>>['formState']['errors'];
  /**
   * 제출 중 상태
   */
  isSubmitting: boolean;
}

/**
 * GraphQL createUser Mutation 함수
 */
const createUser = async (input: CreateUserInput): Promise<CreateUserResponse> => {
  const query = `
    mutation createUser($createUserInput: CreateUserInput!) {
      createUser(createUserInput: $createUserInput) {
        _id
      }
    }
  `;

  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        createUserInput: input,
      },
    }),
  });

  const result = await response.json();

  // GraphQL 에러 처리
  if (result.errors) {
    throw new Error(result.errors[0]?.message || '회원가입에 실패했습니다.');
  }

  return result;
};

/**
 * 회원가입 폼을 관리하는 훅
 * 
 * react-hook-form, zod, @tanstack/react-query를 사용하여
 * 폼 검증 및 API 호출을 수행합니다.
 * 
 * @returns {UseSignupFormReturn} 폼 관련 함수 및 상태
 * 
 * @example
 * ```tsx
 * const { register, handleSubmit, isValid, errors, isSubmitting } = useSignupForm();
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input {...register('email')} />
 *     {errors.email && <span>{errors.email.message}</span>}
 *     <button type="submit" disabled={!isValid || isSubmitting}>회원가입</button>
 *   </form>
 * );
 * ```
 */
export const useSignupForm = (): UseSignupFormReturn => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [hasShownSuccessModal, setHasShownSuccessModal] = useState(false);
  const [hasShownErrorModal, setHasShownErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  // 모든 필드 값을 감시
  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const name = watch('name');

  // 수동으로 isValid 계산: 모든 필드가 입력되고 에러가 없는지 확인
  const isValid = Boolean(
    email &&
    password &&
    passwordConfirm &&
    name &&
    Object.keys(errors).length === 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    passwordConfirm.trim().length > 0 &&
    name.trim().length > 0
  );

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // 성공 모달을 한 번만 표시
      if (!hasShownSuccessModal) {
        setHasShownSuccessModal(true);
        openSuccessModal();
      }
    },
    onError: (error: Error) => {
      // 실패 모달을 한 번만 표시
      if (!hasShownErrorModal) {
        setHasShownErrorModal(true);
        openErrorModal(error.message);
      }
    },
  });

  /**
   * 가입완료 모달을 여는 함수
   */
  const openSuccessModal = useCallback(() => {
    openModal(
      <div data-testid="auth-signup-success-modal">
        <Modal
          variant="info"
          actions="single"
          title="회원가입 완료"
          message="회원가입이 완료되었습니다."
          primaryButtonText="확인"
          primaryButtonDataTestId="modal-primary-button"
          onPrimaryClick={() => {
            closeModal(); // 모달 닫기
            setHasShownSuccessModal(false); // 상태 초기화
            router.push(URL_PATHS.AUTH.LOGIN); // 로그인 페이지로 이동
          }}
        />
      </div>
    );
  }, [openModal, closeModal, router]);

  /**
   * 가입실패 모달을 여는 함수
   */
  const openErrorModal = useCallback((errorMessage: string) => {
    openModal(
      <div data-testid="auth-signup-error-modal">
        <Modal
          variant="danger"
          actions="single"
          title="회원가입 실패"
          message={errorMessage}
          primaryButtonText="확인"
          primaryButtonDataTestId="modal-primary-button"
          onPrimaryClick={() => {
            closeModal(); // 모달 닫기
            setHasShownErrorModal(false); // 상태 초기화
          }}
        />
      </div>
    );
  }, [openModal, closeModal]);

  /**
   * 폼 제출 핸들러
   */
  const onSubmit = (data: SignupFormData) => {
    // 이미 제출 중이거나 모달이 표시된 경우 중복 제출 방지
    if (mutation.isPending || hasShownSuccessModal || hasShownErrorModal) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...createUserInput } = data;
    mutation.mutate(createUserInput);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isValid,
    errors,
    isSubmitting: mutation.isPending,
  };
};

