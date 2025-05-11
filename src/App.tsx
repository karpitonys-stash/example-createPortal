import { useRef, useState } from "react";
import Modal from "./components/Modal";
import ToastContainer, { ToastItem } from "./components/ToastContainer";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [counter, setCounter] = useState(0);
  const toastId = useRef(0);

  const showToast = (message: string) => {
    setToasts((prev) => [
      ...prev,
      { id: ++toastId.current, message }
    ]);
  };

  const handleToastClose = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <button
        className="font-semibold px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setModalOpen(true)}
      >
        모달 열기
      </button>
      <button
        className="font-semibold px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => {
          setCounter(prev => prev+1);
          showToast(`안녕하세요! ${counter}번 토스트입니다.`);
        }}
      >
        토스트 띄우기
      </button>

      <Modal open={isModalOpen} onClose={() => setModalOpen(false)} />
      <ToastContainer toasts={toasts} onClose={handleToastClose} closeDelay={2000} />

      <p className="mt-[90vh]">스크롤 테스트용</p>
    </div>
  );
}
