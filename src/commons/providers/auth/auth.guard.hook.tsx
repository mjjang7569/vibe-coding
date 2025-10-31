'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth.provider';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { URL_PATHS } from '@/commons/constants/url';
import { Modal } from '@/commons/components/modal';

/**
 * useAuthGuard 훅의 반환 타입
 * 인증이 필요한 함수를 감싸는 함수를 반환합니다.
 */
export type UseAuthGuardReturn = <T extends (...args: unknown[]) => unknown>(
  fn: T
) => T;

/**
 * useAuthGuard 훅
 * 
 * 함수 호출 시 인증 상태를 검증하고, 비로그인 사용자인 경우
 * 로그인 모달을 표시합니다.
 * 
 * 테스트 환경에서는 기본적으로 로그인 검사를 패스하지만,
 * window.__TEST_BYPASS__가 false로 설정된 경우 검사를 수행합니다.
 * 
 * @returns 함수를 감싸는 고차 함수
 * 
 * @example
 * ```tsx
 * const authGuard = useAuthGuard();
 * 
 * const handleDelete = authGuard(() => {
 *   // 로그인이 필요한 기능
 *   deleteItem();
 * });
 * 
 * <button onClick={handleDelete}>삭제</button>
 * ```
 */
export function useAuthGuard(): UseAuthGuardReturn {
  const { isAuthenticated } = useAuth();
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  
  // 모달이 이미 표시되었는지 추적 (같은 상황에서 중복 표시 방지)
  const hasShownModalRef = useRef(false);
  
  // 테스트 환경 여부
  const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";
  
  // 테스트 환경에서 로그인 검사 패스 여부
  // 테스트 환경에서는 기본적으로 패스하지만, window.__TEST_BYPASS__가 false면 검사
  const shouldBypassCheck = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }
    
    // 실제 환경: 항상 검사 수행
    if (!isTestEnv) {
      return false;
    }
    
    // 테스트 환경: window.__TEST_BYPASS__가 명시적으로 false가 아니면 패스
    // undefined이거나 true이면 패스
    return (window as Window & { __TEST_BYPASS__?: boolean }).__TEST_BYPASS__ !== false;
  }, [isTestEnv]);
  
  /**
   * 로그인 모달 표시
   * 이미 표시된 경우 다시 표시하지 않음
   */
  const showLoginModal = useCallback(() => {
    // 이미 모달이 표시된 경우 무시
    if (hasShownModalRef.current) {
      return;
    }
    
    hasShownModalRef.current = true;
    
    /**
     * 모든 모달을 닫는 함수
     * 모달 스택이 모두 비워질 때까지 closeModal을 반복 호출
     * 최대 반복 횟수를 설정하여 무한 루프 방지
     */
    const closeAllModals = () => {
      // 일반적으로 모달이 동시에 10개 이상 열리는 경우는 거의 없으므로
      // 최대 10번 반복 호출하여 모든 모달을 닫음
      const MAX_ITERATIONS = 10;
      let iterations = 0;
      
      const closeNext = () => {
        if (iterations < MAX_ITERATIONS) {
          closeModal();
          iterations++;
          setTimeout(closeNext, 0);
        }
      };
      closeNext();
    };
    
    /**
     * 로그인하러가기 버튼 핸들러
     * 모든 모달을 닫고 로그인 페이지로 이동
     */
    const handleLogin = () => {
      // 모든 모달 닫기
      closeAllModals();
      hasShownModalRef.current = false;
      
      // 로그인 페이지로 이동
      router.push(URL_PATHS.AUTH.LOGIN);
    };
    
    /**
     * 취소 버튼 핸들러
     * 모든 모달을 닫기
     */
    const handleCancel = () => {
      // 모든 모달 닫기
      closeAllModals();
      hasShownModalRef.current = false;
    };
    
    // 로그인하시겠습니까 모달 표시
    openModal(
      <Modal
        variant="info"
        actions="dual"
        title="로그인하시겠습니까"
        message="회원 전용 기능입니다. 로그인이 필요합니다."
        primaryButtonText="로그인하러가기"
        secondaryButtonText="취소"
        onPrimaryClick={handleLogin}
        onSecondaryClick={handleCancel}
      />
    );
  }, [openModal, closeModal, router]);
  
  /**
   * 함수를 감싸는 고차 함수
   * 인증이 필요한 함수를 인자로 받아 인증 검사를 추가한 함수를 반환
   */
  return useCallback(
    <T extends (...args: unknown[]) => unknown>(fn: T): T => {
      return ((...args: Parameters<T>) => {
        // 로그인 검사 패스 여부 확인
        if (shouldBypassCheck()) {
          // 테스트 환경에서 패스하는 경우 그냥 실행
          return fn(...args);
        }
        
        // 실제 인증 검사
        if (!isAuthenticated) {
          // 비로그인 사용자: 모달 표시하고 함수 실행 중단
          showLoginModal();
          return;
        }
        
        // 로그인 사용자: 함수 실행
        return fn(...args);
      }) as T;
    },
    [isAuthenticated, shouldBypassCheck, showLoginModal]
  );
}

