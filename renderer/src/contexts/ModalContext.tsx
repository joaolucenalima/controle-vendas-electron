import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Modal } from '../components/modal';

type ModalType = {
  modalElement: ReactNode;
  title: string;
} | null

interface ModalContextType {
  modal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setModal(modal);
  const closeModal = () => setModal(null);

  useEffect(() => {
    if (modal) {
      const modalElement = document.getElementById("modal_overlay") as HTMLElement;
      const focusableElements = modalElement.querySelectorAll<HTMLElement>(
        'input, button, select, [tabindex]'
      );
      
      const firstElement = focusableElements[0];      
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setModal(null);
        }
      };

      modalElement.addEventListener("keydown", handleTabKeyPress);
      modalElement.addEventListener("keydown", handleEscapeKeyPress);

      return () => {
        modalElement.removeEventListener("keydown", handleTabKeyPress);
        modalElement.removeEventListener("keydown", handleEscapeKeyPress);
      };
    }
  }, [modal])

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};