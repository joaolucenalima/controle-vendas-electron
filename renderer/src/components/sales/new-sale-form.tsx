import { useParams } from "react-router"
import { useModal } from "../../contexts/ModalContext"
import { Datepicker } from "../datepicker"
import { StyledSelect } from "../styled-select"

export function NewSaleForm() {
  const { id } = useParams()
  const { closeModal } = useModal()

  const options = [
    { value: 1, label: "Arandela" },
    { value: 2, label: "Redondinha" },
    { value: 3, label: "Cúpula" }
  ]

  return (
    <form className="flex flex-col gap-2">
      <div>
        <label htmlFor="" className="block mb-1">Data da venda *</label>
        <Datepicker
          placeholderText="Selecione a data"
          initialDate={new Date()}
        />
      </div>

      <div>
        <label htmlFor="" className="block mb-1">Produtos *</label>
        <StyledSelect
          options={options}
          isMulti
          placeholder="Selecione os produtos"
          closeMenuOnSelect={false}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <button
          type="button"
          className="border border-gray-400 rounded px-4 py-2 text-black hover:bg-gray-200 transition-colors"
          onClick={() => closeModal()}
        >
          Cancelar
        </button>

        <button
          className="bg-green-500 text-white font-semibold rounded px-4 py-2 hover:bg-green-600 transition-colors"
          type="submit"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}