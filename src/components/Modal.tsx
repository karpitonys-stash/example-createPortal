import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

function Modal({ open, onClose }: ModalProps) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded min-w-xs min-h-[200px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">모달창!</h2>
        <p className="text-gray-700 mb-4">createPortal로 만든 모달창입니다.</p>
        <button
          className="mt-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
