import { useEffect } from "react";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  closeDelay?: number;
}

function Toast({ open, message, onClose, closeDelay = 2000 }: ToastProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, closeDelay);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, closeDelay]);

  if (!open) return null;
  return (
    <div className="mb-2 bg-yellow-200 text-gray-800 px-4 py-2 rounded shadow flex items-center min-w-[200px]">
      <span>{message}</span>
      <button
        className="ml-3 text-gray-500 hover:text-gray-800"
        onClick={onClose}
        aria-label="닫기"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
