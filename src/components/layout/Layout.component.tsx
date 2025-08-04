import type { ReactNode } from 'react';
import { Header } from '../header/Header.component';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div className={`${styles.layout} ${className}`}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
