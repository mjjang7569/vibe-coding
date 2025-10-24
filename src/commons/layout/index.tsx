'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';
import { URL_PATHS } from '@/commons/constants/url';
import { useActiveTab } from './hooks/index.link.routing.hook';
import { useAreaVisibility } from './hooks/index.area.hook';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDiariesActive, isPicturesActive } = useActiveTab();
  const { 
    showHeader, 
    showLogo, 
    showBanner, 
    showNavigation, 
    showFooter 
  } = useAreaVisibility();

  return (
    <div className={styles.container} data-testid="layout-container">
      {/* Header 영역 */}
      {showHeader && (
        <header className={styles.header}>
          {showLogo && (
            <Link href={URL_PATHS.DIARIES.LIST}>
              <div className={styles.logo} data-testid="layout-logo">민지의 다이어리</div>
            </Link>
          )}
        </header>
      )}
      
      {/* Gap */}
      {showHeader && <div className={styles.gap} />}
      
      {/* Banner 영역 */}
      {showBanner && (
        <section className={styles.banner}>
          <Image 
            src="/images/banner.png" 
            alt="배너 이미지" 
            className={styles.bannerImage}
            width={1168}
            height={240}
            priority
          />
        </section>
      )}
      
      {/* Gap */}
      {showBanner && <div className={styles.gap} />}
      
      {/* Navigation 영역 */}
      {showNavigation && (
        <nav className={styles.navigation}>
          <div className={styles.navTabs}>
            <Link href={URL_PATHS.DIARIES.LIST}>
              <button 
                className={isDiariesActive ? styles.navTabActive : styles.navTab}
                data-testid="nav-tab-diaries"
              >
                일기보관함
              </button>
            </Link>
            <Link href={URL_PATHS.PICTURES.LIST}>
              <button 
                className={isPicturesActive ? styles.navTabActive : styles.navTab}
                data-testid="nav-tab-pictures"
              >
                사진보관함
              </button>
            </Link>
          </div>
        </nav>
      )}
      
      
      {/* Main Content 영역 (children 포함) */}
      <main className={styles.main}>
        {children}
      </main>
      
      {/* Footer 영역 */}
      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>민지의 다이어리</div>
            <div className={styles.footerInfo}>대표 : 민지</div>
            <div className={styles.footerCopyright}>Copyright © 2024. 민지 Co., Ltd.</div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
