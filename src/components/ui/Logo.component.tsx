interface LogoProps {
  className?: string;
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`logo ${className}`}>
      <img src="/src/assets/logo_icon.svg" alt="Logo" className="logo-icon" />
      <span className="text-black font-bold text-xl">ShopOnline</span>
    </div>
  );
};
