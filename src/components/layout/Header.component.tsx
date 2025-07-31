import { Logo } from '../ui/Logo.component';
import { SearchBar } from '../ui/SearchBar.component';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <header className={`header ${className}`}>
      <div className="header-container">
        <Logo />
        <SearchBar />
      </div>
    </header>
  );
};
