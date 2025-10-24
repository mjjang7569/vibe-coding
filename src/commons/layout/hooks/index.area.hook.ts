'use client';

import { usePathname } from 'next/navigation';
import { getURLMetadata, type UIVisibility } from '@/commons/constants/url';

/**
 * URL 경로에 따른 영역 노출 여부를 관리하는 Hook
 * @returns {Object} 각 영역의 노출 여부와 관련 정보
 */
export const useAreaVisibility = () => {
  const pathname = usePathname();
  
  // 현재 경로의 메타데이터 가져오기
  const metadata = getURLMetadata(pathname);
  
  // 기본값 설정 (메타데이터가 없을 경우 모든 영역 숨김)
  const defaultVisibility: UIVisibility = {
    header: false,
    logo: false,
    darkModeToggle: false,
    banner: false,
    navigation: false,
    footer: false,
  };
  
  // 현재 경로의 visibility 설정
  const visibility = metadata?.visibility || defaultVisibility;
  
  return {
    // 각 영역의 노출 여부
    showHeader: visibility.header,
    showLogo: visibility.logo || false,
    showDarkModeToggle: visibility.darkModeToggle || false,
    showBanner: visibility.banner,
    showNavigation: visibility.navigation,
    showFooter: visibility.footer,
    
    // 전체 visibility 객체 (필요시 사용)
    visibility,
    
    // 현재 경로 정보
    currentPath: pathname,
    metadata,
  };
};
