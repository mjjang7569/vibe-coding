import React from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* Header 영역 */}
      <header className={styles.header}>
        <div className={styles.logo}>민지의 다이어리</div>
      </header>
      
      {/* Gap */}
      <div className={styles.gap} />
      
      {/* Banner 영역 */}
      <section className={styles.banner}>
        <img src="/images/banner.png" alt="배너 이미지" className={styles.bannerImage} />
      </section>
      
      {/* Gap */}
      <div className={styles.gap} />
      
      {/* Navigation 영역 */}
      <nav className={styles.navigation}>
        <div className={styles.navTabs}>
          <button className={styles.navTabActive}>일기보관함</button>
          <button className={styles.navTab}>사진보관함</button>
        </div>
      </nav>
      
      
      {/* Main Content 영역 (children 포함) */}
      <main className={styles.main}>
        {children}
      </main>
      
      {/* Footer 영역 */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>민지의 다이어리</div>
          <div className={styles.footerInfo}>대표 : 민지</div>
          <div className={styles.footerCopyright}>Copyright © 2024. 민지 Co., Ltd.</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
