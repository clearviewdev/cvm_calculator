import { useRef, useEffect, useCallback } from 'react';
import useInputModalStore from '../store/inputModalStore';

const Modal = ({ children }: any) => {
  const modalRef = useRef(null);
  const { showModal, completeEdit } = useInputModalStore((state) => state);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      completeEdit();
    }
  };

  const keyPress = useCallback(
    (e: any) => {
      if (e.key === 'Escape' && showModal) {
        completeEdit();
      }
    },
    [showModal, completeEdit]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);
  return (
    // backdrop
    <div
      onClick={closeModal}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${showModal ? 'visible bg-black/20' : 'invisible'}
      `}
    >
      {/* modal */}
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
