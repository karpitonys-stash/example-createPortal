import { createPortal } from "react-dom";
import Toast from "./Toast";

export interface ToastItem {
  id: number;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: number) => void;
  closeDelay?: number;
}

function ToastContainer({ toasts, onClose, closeDelay }: ToastContainerProps) {
  // 우측 상단에 쌓이도록 토스트 컨테이너를 포탈로 렌더링
  return createPortal(
    <div className="fixed top-4 right-4 flex flex-col items-end">
      {toasts.slice().reverse().map((toast) => (
        <Toast
          key={toast.id}
          open={true}
          message={toast.message}
          onClose={() => onClose(toast.id)}
          closeDelay={closeDelay}
        />
      ))}
    </div>,
    document.body
  );
}

export default ToastContainer;
