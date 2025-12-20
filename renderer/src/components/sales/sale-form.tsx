import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import { Button } from "../button";
import { Datepicker } from "../datepicker";
import { StyledSelect } from "../styled-select";

type SelectedProducts = {
  id: string;
  product: string;
  quantity: number;
  priceInCents: number;
};

export function SaleForm({ id }: { id?: number }) {
  const { closeModal } = useModal();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);

  const products = [
    {
      id: 1,
      name: "Arandela",
      priceInCents: 2000,
    },
    {
      id: 2,
      name: "Redondinha",
      priceInCents: 1800,
    },
    {
      id: 3,
      name: "Cúpula",
      priceInCents: 2200,
    },
  ];

  function handleChangeProductQuantity(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.currentTarget.value);

    if (!value || isNaN(value)) {
      value = 0;
      e.currentTarget.value = "";
    } else if (value < 1) {
      value = Math.abs(value);
      e.currentTarget.value = value.toString();
    }

    setSelectedProducts((prev) => {
      return prev.map((product) => {
        if (product.id == id) {
          return {
            ...product,
            quantity: value,
          };
        }

        return product;
      });
    });
  }

  const totalInCents = selectedProducts.reduce(
    (sum, product) => sum + product.quantity * product.priceInCents,
    0
  );

  const totalFormatted = (totalInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <form className="flex flex-col gap-2">
      <div>
        <label htmlFor="" className="block mb-1">
          Data da venda *
        </label>
        <Datepicker placeholderText="Selecione a data" selected={new Date()} />
      </div>

      <div>
        <label htmlFor="" className="block mb-1">
          Produtos *
        </label>
        <StyledSelect
          options={products.map((product) => ({ value: product.id, label: product.name }))}
          isMulti
          placeholder="Selecione os produtos"
          closeMenuOnSelect={false}
          onChange={(selected) => {
            setSelectedProducts(
              selected.map((item) => {
                const productData = products.find((p) => p.id === item.value);
                return {
                  id: String(item.value),
                  product: item.label,
                  quantity: 1,
                  priceInCents: productData?.priceInCents ?? 0,
                };
              })
            );
          }}
          value={selectedProducts.map((item) => ({
            value: Number(item.id),
            label: item.product,
          }))}
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="mt-2 font-semibold">Selecione a quantidade de cada produto:</h3>

          {selectedProducts.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <p>{item.product}</p>
              <span className="flex-1 font-semibold text-sm text-gray-500">
                R$ {item.priceInCents / 100}
              </span>

              <button
                className="text-gray-800 hover:text-black transition-colors p-1 rounded "
                type="button"
                onClick={() => {
                  setSelectedProducts((prev) => prev.filter((product) => product.id !== item.id));
                }}
                title="Remover produto"
              >
                <Trash2 size={16} strokeWidth={2.5} className="text-red-600" />
              </button>

              <input
                type="number"
                className="border border-gray-400 rounded px-2 w-12 text-center focus:outline-none focus:border-gray-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
                defaultValue={item.quantity}
                min={1}
                onChange={(e) => handleChangeProductQuantity(item.id, e)}
              />
            </div>
          ))}

          <p className="pt-2 border-t border-gray-400 text-right font-semibold">
            Total: <span className="text-green-500">{totalFormatted}</span>
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <Button type="button" variant="secondary" onClick={() => closeModal()}>
          Cancelar
        </Button>

        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
