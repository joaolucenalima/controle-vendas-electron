import { createContext, ReactNode } from 'react';

export type ModalType = {
  modalElement: ReactNode;
  title: string;
} | null

export interface ModalContextType {
  modal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);