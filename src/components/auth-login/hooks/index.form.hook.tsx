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
 * LoginUser Input 타입
 */
interface LoginUserInput {
  email: string;
  password: string;
}

/**
 * LoginUser Response 타입
 */
interface LoginUserResponse {
  data: {
    loginUser: {
      accessToken: string;
    };
  };
}

/**
 * FetchUserLoggedIn Response 타입
 */
interface FetchUserLoggedInResponse {
  data: {
    fetchUserLoggedIn: {
      _id: string;
      name: string;
    };
  };
}

/**
 * Form 스키마 정의
 * 
 * 검증 조건:
 * - email: '@' 포함
 * - password: 최소 1글자 이상
 */
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .refine((email) => email.includes('@'), {
      message: '올바른 이메일 형식이 아닙니다. (@를 포함해주세요)',
    }),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.'),
});

/**
 * Form 데이터 타입
 */
export type LoginFormData = z.infer<typeof loginFormSchema>;

/**
 * 로그인 폼 훅의 반환 타입
 */
export interface UseLoginFormReturn {
  /**
   * react-hook-form의 register 함수
   */
  register: ReturnType<typeof useForm<LoginFormData>>['register'];
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
  errors: ReturnType<typeof useForm<LoginFormData>>['formState']['errors'];
  /**
   * 제출 중 상태
   */
  isSubmitting: boolean;
}

/**
 * GraphQL loginUser Mutation 함수
 */
const loginUser = async (input: LoginUserInput): Promise<LoginUserResponse> => {
  const query = `
    mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        accessToken
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
        email: input.email,
        password: input.password,
      },
    }),
  });

  const result = await response.json();

  // GraphQL 에러 처리
  if (result.errors) {
    throw new Error(result.errors[0]?.message || '로그인에 실패했습니다.');
  }

  return result;
};

/**
 * GraphQL fetchUserLoggedIn Query 함수
 */
const fetchUserLoggedIn = async (accessToken: string): Promise<FetchUserLoggedInResponse> => {
  const query = `
    query {
      fetchUserLoggedIn {
        _id
        name
      }
    }
  `;

  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query,
    }),
  });

  const result = await response.json();

  // GraphQL 에러 처리
  if (result.errors) {
    throw new Error(result.errors[0]?.message || '사용자 정보 조회에 실패했습니다.');
  }

  return result;
};

/**
 * 로그인 폼을 관리하는 훅
 * 
 * react-hook-form, zod, @tanstack/react-query를 사용하여
 * 폼 검증 및 API 호출을 수행합니다.
 * 
 * @returns {UseLoginFormReturn} 폼 관련 함수 및 상태
 * 
 * @example
 * ```tsx
 * const { register, handleSubmit, isValid, errors, isSubmitting } = useLoginForm();
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input {...register('email')} />
 *     {errors.email && <span>{errors.email.message}</span>}
 *     <button type="submit" disabled={!isValid || isSubmitting}>로그인</button>
 *   </form>
 * );
 * ```
 */
export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [hasShownSuccessModal, setHasShownSuccessModal] = useState(false);
  const [hasShownErrorModal, setHasShownErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 모든 필드 값을 감시
  const email = watch('email');
  const password = watch('password');

  // 수동으로 isValid 계산: 모든 필드가 입력되고 에러가 없는지 확인
  const isValid = Boolean(
    email &&
    password &&
    Object.keys(errors).length === 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0
  );

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: async (input: LoginUserInput) => {
      // 1. 로그인 API 호출
      const loginResponse = await loginUser(input);
      const accessToken = loginResponse.data.loginUser.accessToken;

      // 2. 사용자 정보 조회 API 호출
      const userResponse = await fetchUserLoggedIn(accessToken);
      const user = userResponse.data.fetchUserLoggedIn;

      // 3. localStorage에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify({ _id: user._id, name: user.name }));
      }

      return { accessToken, user };
    },
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
   * 로그인완료 모달을 여는 함수
   */
  const openSuccessModal = useCallback(() => {
    openModal(
      <div data-testid="auth-login-success-modal">
        <Modal
          variant="info"
          actions="single"
          title="로그인 완료"
          message="로그인이 완료되었습니다."
          primaryButtonText="확인"
          primaryButtonDataTestId="modal-primary-button"
          onPrimaryClick={() => {
            closeModal(); // 모달 닫기
            setHasShownSuccessModal(false); // 상태 초기화
            router.push(URL_PATHS.DIARIES.LIST); // 일기목록 페이지로 이동
          }}
        />
      </div>
    );
  }, [openModal, closeModal, router]);

  /**
   * 로그인실패 모달을 여는 함수
   */
  const openErrorModal = useCallback((errorMessage: string) => {
    openModal(
      <div data-testid="auth-login-error-modal">
        <Modal
          variant="danger"
          actions="single"
          title="로그인 실패"
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
  const onSubmit = (data: LoginFormData) => {
    // 이미 제출 중이거나 모달이 표시된 경우 중복 제출 방지
    if (mutation.isPending || hasShownSuccessModal || hasShownErrorModal) {
      return;
    }

    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isValid,
    errors,
    isSubmitting: mutation.isPending,
  };
};

