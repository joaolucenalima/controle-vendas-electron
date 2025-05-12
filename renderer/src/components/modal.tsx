import { X } from "lucide-react";
import { useModal } from "../contexts/ModalContext";

export function Modal() {
  const { closeModal, modal } = useModal();

  if (!modal) return null;

  return (
    <div id="modal_overlay" className="fixed inset-0 z-10 bg-black bg-opacity-35 backdrop-blur-[2px] animate-overlayShow">
      <div className="bg-gray-50 fixed top-1/2 left-1/2 z-20 w-[600px] -translate-x-1/2 -translate-y-1/2 py-3 px-6 rounded-lg shadow animate-contentShow">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-lg font-bold">{modal.title}</h1>
          
          <button className="flex items-center justify-center transition-colors" onClick={closeModal}>
            <X className="text-black w-5 h-5" />
          </button>
        </div>

        {modal.modalElement}
      </div>
    </div>
  );
}