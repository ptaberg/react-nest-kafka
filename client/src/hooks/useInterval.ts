import { useRef, useEffect } from "react";

export const useInterval = (callback: () => Promise<unknown>, delay: number, condition?: boolean) => {
    const savedCallback = useRef<Function>();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current?.();
      }
      if (delay !== null && condition) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay, condition]);
  }