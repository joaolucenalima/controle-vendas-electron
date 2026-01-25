import { Product } from "@api/product";
import { Sale } from "@api/sale";
import { Datepicker } from "@components/datepicker";
import { StyledSelect } from "@components/styled-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@hooks/use-modal";
import { Button } from "flowbite-react";
import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const saleFormSchema = z.object({
  date: z.string("Campo obrigatório"),
});

type SaleFormType = z.infer<typeof saleFormSchema>;

export function SaleForm({ id }: { id?: number }) {
  const { closeModal } = useModal();

  const [sale, setSale] = useState<Sale | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Sale["products"]>([]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SaleFormType>({
    resolver: zodResolver(saleFormSchema),
  });

  const totalFormatted = useMemo(() => {
    const totalInCents = selectedProducts.reduce(
      (sum, product) => sum + product.quantity * product.priceInCents,
      0,
    );

    return (totalInCents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }, [selectedProducts]);

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

  function submitSale(data: SaleFormType) {
    const saleDataPayload = {
      date: new Date(data.date),
      products: selectedProducts,
    };

    if (id) {
      window.api.sale.update({
        id,
        data: saleDataPayload,
      });

      return;
    }

    window.api.sale.create(saleDataPayload);
  }

  useEffect(() => {
    window.api.product.getAll().then((response) => {
      setProducts(response);
    });

    if (id) {
      window.api.sale.getById(id).then((response) => {
        setSale(response);
        setSelectedProducts(response.products);
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(submitSale)} className="flex flex-col gap-2">
      <div>
        <label htmlFor="sale-date" className="block mb-1">
          Data da venda *
        </label>
        <Datepicker name="date" id="sale-date" placeholder="Selecione a data" />
      </div>

      <div>
        <label htmlFor="sale-products" className="block mb-1">
          Produtos *
        </label>
        <StyledSelect
          id="sale-products"
          options={products.map((product) => ({ value: product.id, label: product.name }))}
          isMulti
          placeholder="Selecione os produtos"
          closeMenuOnSelect={false}
          onChange={(selected) => {
            setSelectedProducts((prev) =>
              selected.map((item) => {
                const productData = products.find((p) => p.id === item.value);
                const prevQuantity = prev.find((product) => product.id === item.value)?.quantity;

                return {
                  id: item.value,
                  name: item.label,
                  quantity: prevQuantity || 1,
                  priceInCents: productData?.priceInCents ?? 0,
                };
              }),
            );
          }}
          value={selectedProducts.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="mt-2 font-semibold">Selecione a quantidade de cada produto:</h3>

          {selectedProducts.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <p>{item.name}</p>
              <p className="flex-1 font-semibold text-primary-700">
                R$ {item.priceInCents / 100}
              </p>

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
                className="border border-gray-300 rounded-lg px-2.5 p-1 w-12 text-center text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
                defaultValue={item.quantity}
                min={1}
                onChange={(e) => handleChangeProductQuantity(item.id, e)}
              />
            </div>
          ))}

          <p className="pt-2 border-t border-gray-400 text-right font-semibold">
            Total: <span className="text-primary-700 ml-1">{totalFormatted}</span>
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <Button type="button" color="alternative" onClick={closeModal}>
          Cancelar
        </Button>

        <Button type="submit">Salvar venda</Button>
      </div>
    </form>
  );
}
