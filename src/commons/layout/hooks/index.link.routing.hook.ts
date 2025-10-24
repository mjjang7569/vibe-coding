import { usePathname } from 'next/navigation';
import { URL_PATHS } from '@/commons/constants/url';

/**
 * 현재 경로에 따라 활성화된 탭을 반환하는 훅
 * @returns {Object} 탭별 활성화 상태
 */
export const useActiveTab = () => {
  const pathname = usePathname();

  /**
   * 현재 경로가 일기 관련 경로인지 확인
   */
  const isDiariesActive = pathname === URL_PATHS.DIARIES.LIST || 
                          pathname?.startsWith('/diaries');

  /**
   * 현재 경로가 사진 관련 경로인지 확인
   */
  const isPicturesActive = pathname === URL_PATHS.PICTURES.LIST || 
                           pathname?.startsWith('/pictures');

  return {
    isDiariesActive,
    isPicturesActive,
  };
};


