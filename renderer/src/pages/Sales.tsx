import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { ConfirmDeletePopup } from "../components/confirm-delete-popup";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";
import { SaleForm } from "../components/sales/sale-form";
import { StyledSelect } from "../components/styled-select";
import { useModal } from "../contexts/ModalContext";

export function Sales() {
  const { openModal } = useModal();
  const sales = [
    {
      id: 1,
      createdAt: "04/05/2025",
      totalProducts: 150,
      soldProducts: "Arandela, Redondinha, Redondinha com pé",
      amount_in_cents: 200000,
    },
    {
      id: 2,
      createdAt: "10/05/2025",
      totalProducts: 80,
      soldProducts: "Plafon, Luminária de mesa",
      amount_in_cents: 120000,
    },
    {
      id: 3,
      createdAt: "12/05/2025",
      totalProducts: 60,
      soldProducts: "Abajur, Spot LED",
      amount_in_cents: 95000,
    },
    {
      id: 4,
      createdAt: "15/05/2025",
      totalProducts: 200,
      soldProducts: "Pendente, Trilho, Plafon",
      amount_in_cents: 350000,
    },
    {
      id: 5,
      createdAt: "18/05/2025",
      totalProducts: 40,
      soldProducts: "Lustre, Luminária de chão",
      amount_in_cents: 80000,
    },
  ];

  return (
    <div className="flex flex-col">
      <PageTopbar className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Vendas</h1>

        <PrimaryButton
          handleClick={() =>
            openModal({
              title: "Adicionar venda",
              modalElement: <SaleForm />,
            })
          }
        >
          <Plus size={18} />
          Novo
        </PrimaryButton>
      </PageTopbar>

      <main className="px-4 py-6 max-h-full grid grid-cols-3 grid-rows-[auto 1fr] gap-y-4">
        <table className="w-full border border-zinc-300 border-collapse rounded col-span-3">
          <thead>
            <tr className="bg-[#fafafa] *:border *:border-zinc-300 *:font-normal *:py-3 *:px-4 *:rounded">
              <th className="text-center">Detalhes</th>
              <th className="text-center">ID</th>
              <th className="text-left">Data da venda</th>
              <th className="text-left">Total de produtos</th>
              <th className="text-left">Produtos vendidos</th>
              <th className="text-left">Preço total</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="*:border *:border-zinc-300 *:py-2 *:px-4">
                <td className="text-center">
                  <button
                    className="rounded bg-white h-8 w-8 border border-zinc-300 inline-flex items-center justify-center transition-colors hover:border-zinc-400"
                    title="Ver detalhes"
                  >
                    <Search size={16} />
                  </button>
                </td>
                <td className="text-center">{sale.id}</td>
                <td>{sale.createdAt}</td>
                <td className="whitespace-nowrap">
                  {sale.totalProducts}
                  <span className="italic text-sm">
                    {" "}
                    ({sale.soldProducts.split(", ").length} diferentes)
                  </span>
                </td>
                <td className="overflow-ellipsis whitespace-nowrap">{sale.soldProducts}</td>
                <td>
                  {(sale.amount_in_cents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  <div className="text-center">
                    <button
                      className="inline-flex items-center justify-center w-6 h-6 transition-colors hover:text-gray-400"
                      title="Editar"
                      onClick={() =>
                        openModal({
                          title: "Editar venda n° " + sale.id,
                          modalElement: <SaleForm id={sale.id} />,
                        })
                      }
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="ml-2 w-6 h-6 inline-flex items-center justify-center transition-colors hover:text-red-500"
                      title="Excluir"
                      onClick={() =>
                        openModal({
                          title: "Confirmar exclusão",
                          modalElement: <ConfirmDeletePopup onDelete={() => {}}/>,
                        })
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <StyledSelect
          options={[
            {
              value: 10,
              label: "10 resultados por página",
            },
            {
              value: 25,
              label: "25 resultados por página",
            },
            {
              value: 50,
              label: "50 resultados por página",
            },
          ]}
          isSearchable={false}
          defaultValue={{ value: 10, label: "10 resultados por página" }}
          closeMenuOnSelect={false}
          className="max-w-72"
        />

        <div className="self-center justify-self-center flex items-center gap-3">
          <button className="h-6 w-6 inline-flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
            1
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
            2
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
            3
          </button>

          <span className="text-xl">...</span>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
            9
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
            10
          </button>

          <button className="h-6 w-6 inline-flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
        </div>

        <span className="self-center justify-self-end">
          <strong>1 - 10</strong> / 900 results
        </span>
      </main>
    </div>
  );
}
