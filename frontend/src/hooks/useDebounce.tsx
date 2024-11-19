import { useCallback, useRef } from "react";
import debounce from "lodash.debounce";

// Custom hook to debounce any function with type safety
export const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) => {
  const debouncedFnRef = useRef(debounce(fn, delay));

  return useCallback((...args: Parameters<T>): void => {
    debouncedFnRef.current(...args);
  }, []);
};
