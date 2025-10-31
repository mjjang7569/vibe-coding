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
  
  // 테스트 환경 여부
  // Next.js에서 NEXT_PUBLIC_ 환경 변수는 빌드 타임에 번들에 포함됩니다
  // webServer.env로 설정된 환경 변수는 Next.js 개발 서버 시작 시 전달되어야 합니다
  const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

  // AuthProvider 초기화 확인
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") {
      return;
    }

    // AuthProvider가 초기화되었음을 확인
    // AuthProvider의 useEffect가 실행되어 인증 상태가 설정될 때까지 대기
    // requestAnimationFrame을 사용하여 한 렌더링 사이클 후 초기화 완료로 간주
    const frameId = requestAnimationFrame(() => {
      setIsInitialized(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  // 경로 변경 시 모달 표시 상태 리셋
  useEffect(() => {
    hasShownModalRef.current = false;
  }, [pathname]);

  // 권한 검증 및 모달 처리
  useEffect(() => {
    // 초기화되지 않았으면 대기
    if (!isInitialized) {
      return;
    }

    // 테스트 환경에서는 항상 접근 허용
    if (isTestEnv) {
      return;
    }

    // 현재 경로에 접근 가능한지 확인
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
  }, [pathname, isAuthenticated, isInitialized, isTestEnv, openModal, closeModal, router]);

  // 초기화 중이거나 권한 검증이 필요한 경우 빈 화면 표시
  if (!isInitialized) {
    return null;
  }

  // 테스트 환경에서는 항상 children 표시
  if (isTestEnv) {
    return <>{children}</>;
  }

  // 실제 환경: 권한 검증
  const canAccess = canAccessURL(pathname, isAuthenticated);

  // 접근 가능한 경우에만 children 표시
  if (canAccess) {
    return <>{children}</>;
  }

  // 접근 불가능한 경우 빈 화면 (모달은 이미 표시됨)
  return null;
}

