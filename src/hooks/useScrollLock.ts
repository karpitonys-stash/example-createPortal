import { useLayoutEffect } from "react";

export const useScrollLock = (open: boolean) => {
  useLayoutEffect(() => {
    if (!open) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);
};
