import { useAuth } from '@/commons/providers/auth/auth.provider';

/**
 * 인증 관련 훅
 * 인증 상태에 따른 UI 분기 및 로그인/로그아웃 기능을 제공합니다.
 * @returns {Object} 인증 상태 및 핸들러 함수들
 */
export const useAuthStatus = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  /**
   * 로그인 핸들러
   * 로그인 페이지로 이동합니다.
   */
  const handleLogin = () => {
    login();
  };

  /**
   * 로그아웃 핸들러
   * 로그아웃 처리를 수행합니다.
   */
  const handleLogout = () => {
    logout();
  };

  return {
    isAuthenticated,
    user,
    handleLogin,
    handleLogout,
  };
};


