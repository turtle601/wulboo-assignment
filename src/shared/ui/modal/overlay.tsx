import { useEffect, useRef } from 'react';

import { useModalStore } from './store';

export function Overlay() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modalContent, closeModal } = useModalStore();

  const isOpen = !!modalContent;
  const modalRoot = window.document.getElementById('modal-root');

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'unset';
    }

    return () => {
      window.document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 키 이벤트를 window.document에 추가
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      window.document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, isOpen]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    // 배경(overlay)을 클릭했을 때만 모달 닫기
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (!modalRoot || !isOpen) {
    return null;
  }

  return (
    <div
      className="w-full h-full fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={handleClickOutside}
    >
      <div ref={modalRef}>{modalContent}</div>
    </div>
  );
}
