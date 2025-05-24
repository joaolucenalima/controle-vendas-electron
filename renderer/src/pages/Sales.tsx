import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { NewSaleForm } from "../components/new-sale-form";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";
import { useModal } from "../contexts/ModalContext";

export function Sales() {
  const { openModal } = useModal()

  return (
    <div className="flex flex-col">
      <PageTopbar className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Vendas</h1>

        <PrimaryButton handleClick={() => openModal({
          title: 'Adicionar venda',
          modalElement: <NewSaleForm />
        })}
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
            <tr className="*:border *:border-zinc-300 *:py-2 *:px-4">
              <td className="text-center">
                <button
                  className="rounded bg-white h-8 w-8 border border-zinc-300 inline-flex items-center justify-center transition-colors hover:border-zinc-400"
                  title="Ver detalhes"
                >
                  <Search size={16} />
                </button>
              </td>
              <td className="text-center">1</td>
              <td>04/05/2025</td>
              <td className="whitespace-nowrap">
                150
                <span className="italic text-sm"> (4 diferentes)</span>
              </td>
              <td className="overflow-ellipsis whitespace-nowrap">
                Arandela, Redondinha, Redondinha com pé
              </td>
              <td>R$ 2000</td>
              <td>
                <div className="text-center">
                  <button
                    className="inline-flex items-center justify-center w-6 h-6 transition-colors hover:text-gray-400"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="ml-2 w-6 h-6 inline-flex items-center justify-center transition-colors hover:text-red-500"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <select
          className="w-max p-2 bg-inherit border border-zinc-400 rounded cursor-pointer"
          name="results_per_page"
        >
          <option value="5">5 resultados por página</option>
          <option value="10">10 resultados por página</option>
          <option value="25">25 resultados por página</option>
          <option value="50">50 resultados por página</option>
          <option value="100">100 resultados por página</option>
        </select>

        <div className="self-center justify-self-center flex items-center gap-3">
          <button className="h-6 w-6 inline-flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-zinc-300 rounded hover:border-zinc-400">
            1
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-zinc-300 rounded hover:border-zinc-400">
            2
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-zinc-300 rounded hover:border-zinc-400">
            3
          </button>

          <span className="text-xl">...</span>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-zinc-300 rounded hover:border-zinc-400">
            9
          </button>

          <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-zinc-300 rounded hover:border-zinc-400">
            10
          </button>

          <button className="h-6 w-6 inline-flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
        </div>

        <span className="self-center justify-self-end">
          <strong>1 - 10</strong>{' '}
          / 900 results
        </span>
      </main>
    </div>
  )
}