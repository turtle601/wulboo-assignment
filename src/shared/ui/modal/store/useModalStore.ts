import { create } from 'zustand';
import { ReactNode } from 'react';

interface ModalState {
  modalContent: ReactNode | null;
}

interface ModalActions {
  closeModal: () => void;
  openModal: (content: ReactNode) => void;
}

type ModalStore = ModalState & ModalActions;

export const useModalStore = create<ModalStore>((set) => ({
  modalContent: null,

  openModal: (content: ReactNode) =>
    set({
      modalContent: content,
    }),

  closeModal: () =>
    set({
      modalContent: null,
    }),
}));
