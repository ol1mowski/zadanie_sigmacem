import { useState, useCallback } from 'react';

export const useSearchState = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
      setIsResultsVisible(value.trim().length > 0);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setIsResultsVisible(false);
  }, []);

  const hideResults = useCallback(() => {
    setIsResultsVisible(false);
  }, []);

  return {
    searchQuery,
    isResultsVisible,
    handleInputChange,
    handleClearSearch,
    hideResults,
  };
};
