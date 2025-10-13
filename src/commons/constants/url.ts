/**
 * URL Constants
 * 프로젝트 전체에서 사용되는 URL 경로 및 메타데이터 정의
 * 다이나믹 라우팅을 지원하며, 각 URL의 접근 권한 및 UI 노출 설정을 관리합니다.
 */

/**
 * 접근 권한 타입
 */
export type AccessType = '누구나' | '회원전용';

/**
 * UI 컴포넌트 노출 설정
 */
export interface UIVisibility {
  header: boolean;
  logo?: boolean; // header가 true일 때만 의미있음
  darkModeToggle?: boolean; // header가 true일 때만 의미있음
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

/**
 * URL 메타데이터
 */
export interface URLMetadata {
  path: string;
  access: AccessType;
  visibility: UIVisibility;
}

/**
 * URL 경로 상수
 */
export const URL_PATHS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  
  // 일기 관련
  DIARIES: {
    LIST: '/diaries',
    DETAIL: (id: string | number) => `/diaries/${id}`,
    DETAIL_PATTERN: '/diaries/[id]', // 라우팅 패턴용
  },
  
  // 사진 관련
  PICTURES: {
    LIST: '/pictures',
  },
} as const;

/**
 * URL별 메타데이터 설정
 */
export const URL_METADATA: Record<string, URLMetadata> = {
  // 로그인
  [URL_PATHS.AUTH.LOGIN]: {
    path: URL_PATHS.AUTH.LOGIN,
    access: '누구나',
    visibility: {
      header: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  // 회원가입
  [URL_PATHS.AUTH.SIGNUP]: {
    path: URL_PATHS.AUTH.SIGNUP,
    access: '누구나',
    visibility: {
      header: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  // 일기 목록
  [URL_PATHS.DIARIES.LIST]: {
    path: URL_PATHS.DIARIES.LIST,
    access: '누구나',
    visibility: {
      header: true,
      logo: true,
      darkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  
  // 일기 상세 (다이나믹 라우팅 패턴)
  [URL_PATHS.DIARIES.DETAIL_PATTERN]: {
    path: URL_PATHS.DIARIES.DETAIL_PATTERN,
    access: '회원전용',
    visibility: {
      header: true,
      logo: true,
      darkModeToggle: false,
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  
  // 사진 목록
  [URL_PATHS.PICTURES.LIST]: {
    path: URL_PATHS.PICTURES.LIST,
    access: '누구나',
    visibility: {
      header: true,
      logo: true,
      darkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
} as const;

/**
 * 유틸리티 함수: 경로에 따른 메타데이터 가져오기
 * 다이나믹 라우팅 경로도 처리합니다.
 */
export const getURLMetadata = (pathname: string): URLMetadata | undefined => {
  // 정확히 일치하는 경로 먼저 확인
  if (URL_METADATA[pathname]) {
    return URL_METADATA[pathname];
  }
  
  // 다이나믹 라우팅 패턴 매칭
  // /diaries/123 -> /diaries/[id]
  const diaryDetailMatch = pathname.match(/^\/diaries\/[^/]+$/);
  if (diaryDetailMatch) {
    return URL_METADATA[URL_PATHS.DIARIES.DETAIL_PATTERN];
  }
  
  return undefined;
};

/**
 * 유틸리티 함수: 현재 사용자가 해당 경로에 접근 가능한지 확인
 */
export const canAccessURL = (pathname: string, isAuthenticated: boolean): boolean => {
  const metadata = getURLMetadata(pathname);
  
  if (!metadata) {
    return false;
  }
  
  if (metadata.access === '회원전용') {
    return isAuthenticated;
  }
  
  return true;
};

/**
 * 타입 export
 */
export type URLPathKey = keyof typeof URL_PATHS;

