import logoIcon from '../../../assets/logo_icon.svg';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <img src={logoIcon} alt="Logo" className={styles.icon} />
      <span className={styles.text}>ShopOnline</span>
    </div>
  );
};
