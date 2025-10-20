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
        {/* Header 내용은 추후 구현 */}
      </header>
      
      {/* Gap */}
      <div className={styles.gap} />
      
      {/* Banner 영역 */}
      <section className={styles.banner}>
        {/* Banner 내용은 추후 구현 */}
      </section>
      
      {/* Gap */}
      <div className={styles.gap} />
      
      {/* Navigation 영역 */}
      <nav className={styles.navigation}>
        {/* Navigation 내용은 추후 구현 */}
      </nav>
      
      {/* Main Content 영역 (children 포함) */}
      <main className={styles.main}>
        {children}
      </main>
      
      {/* Footer 영역 */}
      <footer className={styles.footer}>
        {/* Footer 내용은 추후 구현 */}
      </footer>
    </div>
  );
};

export default Layout;
