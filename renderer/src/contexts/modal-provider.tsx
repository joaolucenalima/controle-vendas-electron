import { Modal } from "@components/modal";
import { ReactNode, useEffect, useState } from "react";
import { ModalContext, ModalType } from "./modal-context";

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

      firstElement.focus()

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          if (focusableElements.length === 0) return;
          
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

      document.addEventListener("keydown", handleTabKeyPress);

      return () => {
        document.removeEventListener("keydown", handleTabKeyPress);
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
