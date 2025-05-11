import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "../hooks/useScrollLock";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

function Modal({ open, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const first = focusableElements?.[0];
    const last = focusableElements?.[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab" && first && last) {
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={(e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-[400px] w-full flex flex-col items-center justify-center bg-white p-6 rounded-lg">
        <h2 id="modal-title" className="text-xl font-semibold mb-2">
          모달창!
        </h2>
        <p id="modal-desc" className="text-gray-700 mb-4">
          createPortal로 만든 웹 접근성 고려 모달입니다.
        </p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring"
        >
          닫기
        </button>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
