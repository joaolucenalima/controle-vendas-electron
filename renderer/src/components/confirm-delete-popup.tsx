import { useModal } from "@hooks/use-modal";

export function ConfirmDeletePopup({ onDelete }: { onDelete: () => void }) {
  const { closeModal } = useModal();

  return (
    <div>
      <p>Você tem certeza que deseja excluir este item?</p>
      <p className="mt-1 mb-6 font-semibold text-lg">Esta ação não pode ser desfeita.</p>

      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200 transition-colors"
          onClick={() => closeModal()}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          onClick={() => {
            onDelete();
            closeModal();
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
