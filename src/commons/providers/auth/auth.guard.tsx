"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { canAccessURL, URL_PATHS } from "@/commons/constants/url";
import { Modal } from "@/commons/components/modal";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard 컴포넌트
 * 페이지 접근 권한을 검증하고, 권한이 없는 경우 모달을 표시합니다.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { openModal, closeModal } = useModal();
  
  // AuthProvider 초기화 상태 추적
  const [isInitialized, setIsInitialized] = useState(false);
  // 모달이 이미 표시되었는지 추적 (같은 상황에서 중복 표시 방지)
  const hasShownModalRef = useRef(false);
  
  // 테스트 우회 여부를 추적
  // window.__TEST_BYPASS__가 명시적으로 true일 때만 우회
  const [shouldBypass, setShouldBypass] = useState(false);

  // AuthProvider 초기화 확인 및 테스트 우회 설정
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") {
      return;
    }

    // 테스트 우회 플래그 확인
    const bypassFlag = (window as Window & { __TEST_BYPASS__?: boolean }).__TEST_BYPASS__ === true;
    setShouldBypass(bypassFlag);

    // AuthProvider가 초기화되었음을 확인
    // 초기 인증 상태를 즉시 확인하고 초기화 완료로 표시
    // localStorage에서 직접 체크하여 AuthProvider의 초기화를 기다리지 않음
    const checkInitialAuth = () => {
      setIsInitialized(true);
    };

    // 즉시 초기화 체크 (동기적으로 처리)
    checkInitialAuth();
  }, []);

  // 경로 변경 시 모달 표시 상태 리셋 및 테스트 우회 플래그 재확인
  useEffect(() => {
    hasShownModalRef.current = false;
    
    // 경로 변경 시 테스트 우회 플래그 재확인
    if (typeof window !== "undefined") {
      const bypassFlag = (window as Window & { __TEST_BYPASS__?: boolean }).__TEST_BYPASS__ === true;
      setShouldBypass(bypassFlag);
    }
  }, [pathname]);

  // 권한 검증 및 모달 처리
  useEffect(() => {
    // 초기화되지 않았으면 대기
    if (!isInitialized) {
      return;
    }

    // 테스트 우회가 활성화된 경우 항상 접근 허용
    if (shouldBypass) {
      return;
    }

    // 현재 경로에 접근 가능한지 확인
    // isAuthenticated를 즉시 확인하여 최신 상태 반영
    const canAccess = canAccessURL(pathname, isAuthenticated);

    // 접근 불가능하고, 모달을 아직 표시하지 않은 경우
    if (!canAccess && !hasShownModalRef.current) {
      hasShownModalRef.current = true;

      // 로그인해주세요 모달 표시
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="로그인해주세요"
          message="이 페이지는 로그인이 필요합니다."
          primaryButtonText="확인"
          onPrimaryClick={() => {
            // 모든 모달 닫기
            closeModal();
            // 로그인 페이지로 이동
            router.push(URL_PATHS.AUTH.LOGIN);
          }}
        />
      );
    }
  }, [pathname, isAuthenticated, isInitialized, shouldBypass, router]);

  // 초기화 중이거나 권한 검증이 필요한 경우 빈 화면 표시
  if (!isInitialized) {
    return null;
  }

  // 테스트 우회가 활성화된 경우 항상 children 표시
  if (shouldBypass) {
    return <>{children}</>;
  }

  // 실제 환경: 권한 검증
  const canAccess = canAccessURL(pathname, isAuthenticated);

  // 접근 가능한 경우에만 children 표시
  if (canAccess) {
    return <>{children}</>;
  }

  // 접근 불가능한 경우 빈 화면 (리다이렉트가 진행 중)
  // useEffect에서 이미 로그인 페이지로 리다이렉트했으므로 여기서는 null 반환
  return null;
}

