import { useCallback, useEffect, useState } from 'react';

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

export type ToastState = {
  title: string;
  message?: string;
  variant?: ToastVariant;
};

export function useToast(duration = 3600) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((nextToast: ToastState) => {
    setToast(nextToast);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setToast(null);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration, toast]);

  return {
    toast,
    showToast,
    hideToast,
  };
}

