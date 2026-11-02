import {useState, useEffect} from 'react';

export function useDebounce(query: string, delay: number) {
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  useEffect(()=> {
    const timeoutId = setTimeout(function() {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timeoutId)
  }, [query, delay]);

  return debouncedQuery;
}