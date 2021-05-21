import React, { useCallback, useRef } from "react";

/**
 *
 * @param {T} func
 * @param {number} delay
 * @param {import('react').DependencyList} deps
 *
 */
const useDebounce = (func, delay, deps = []) => {
  const timer = useRef();
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback(() => {
    cancel();

    timer.current = window.setTimeout(() => {
      func();
    }, delay);
  }, [deps]);
  return [run, cancel];
};

export default useDebounce;
