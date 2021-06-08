import { useRef } from "react";

export default function useDebouncedPromise(fn, delay) {
  let timeOutRef = useRef(null);
  

  function handler(...params) {
    return new Promise((resolve, reject) => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = window.setTimeout(async () => {
        try {
          const response = await fn(...params);
          resolve(response);

        } catch (err) {
          reject(err);
        }
      }, delay)
    });
  };
  
  return handler;
};