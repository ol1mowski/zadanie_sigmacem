interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  placeholder = 'Search for products',
  className = '',
}: SearchBarProps) => {
  return (
    <div className={`search-container ${className}`}>
      <img
        src="/src/assets/search_icon.svg"
        alt="Search"
        className="search-icon"
      />
      <input type="text" placeholder={placeholder} className="search-input" />
    </div>
  );
};
