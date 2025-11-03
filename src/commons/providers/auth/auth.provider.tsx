"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";

// 사용자 정보 타입
export interface User {
  _id: string;
  name: string;
}

// Auth Context 타입 정의
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

// Auth Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props 타입
interface AuthProviderProps {
  children: React.ReactNode;
}

// 로컬스토리지 키 상수
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
} as const;

// Auth Provider 컴포넌트
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // 로컬스토리지에서 accessToken 조회
  const getAccessToken = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  // 로컬스토리지에서 user 조회
  const getUser = useCallback((): User | null => {
    if (typeof window === "undefined") return null;
    const userString = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userString) return null;
    try {
      return JSON.parse(userString) as User;
    } catch {
      return null;
    }
  }, []);

  // 인증 상태 업데이트
  const updateAuthState = useCallback(() => {
    const token = getAccessToken();
    const userData = getUser();
    setIsAuthenticated(!!token);
    setUser(userData);
  }, [getAccessToken, getUser]);

  // 초기 인증 상태 설정 (클라이언트 사이드에서만 실행)
  useEffect(() => {
    updateAuthState();
  }, [updateAuthState]);

  // 로컬스토리지 변경 감지 - 다른 탭이나 같은 탭에서 localStorage가 변경될 때 감지
  useEffect(() => {
    if (typeof window === "undefined") return;

    // storage 이벤트 리스너 (다른 탭/창에서의 변경 감지)
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEYS.ACCESS_TOKEN ||
        e.key === STORAGE_KEYS.USER ||
        e.key === null // clear() 호출 시
      ) {
        updateAuthState();
      }
    };

    // 커스텀 이벤트 리스너 (같은 탭에서의 변경 감지)
    const handleCustomStorageChange = () => {
      updateAuthState();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleCustomStorageChange);
    };
  }, [updateAuthState]);

  // 로그인 페이지로 이동
  const login = useCallback(() => {
    router.push(URL_PATHS.AUTH.LOGIN);
  }, [router]);

  // 로그아웃 처리 - 로컬스토리지에서 accessToken 제거, user 제거, 로그인 페이지로 이동
  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      // 상태를 즉시 업데이트 (다른 컴포넌트들이 실시간으로 반영받도록)
      updateAuthState();
      
      // 같은 탭에서의 변경을 감지하기 위한 커스텀 이벤트 발생
      window.dispatchEvent(new Event("localStorageChange"));
      
      router.push(URL_PATHS.AUTH.LOGIN);
    }
  }, [router, updateAuthState]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Auth Hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

