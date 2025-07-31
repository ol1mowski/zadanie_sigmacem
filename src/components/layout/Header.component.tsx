import { Logo } from '../ui/Logo.component';
import { SearchBar } from '../ui/SearchBar.component';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        <Logo />
        <SearchBar />
      </div>
    </header>
  );
};
