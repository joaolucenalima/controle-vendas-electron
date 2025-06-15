import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { ConfirmDeletePopup } from "../components/confirm-delete-popup";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";
import { SaleForm } from "../components/sales/sale-form";
import Table from "../components/table/table";
import { ColumnType } from "../components/table/types";
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

  const tableColumns: ColumnType<typeof sales[0]>[] = [
    {
      key: "details",
      label: "Detalhes",
      render: () => (
        <button
          className="rounded bg-white h-8 w-8 border border-zinc-300 inline-flex items-center justify-center transition-colors hover:border-zinc-400"
          title="Ver detalhes"
        >
          <Search size={16} />
        </button>
      ),
    },
    {
      key: "id",
      dataIndex: "id",
      label: "ID",
      align: "center"
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      label: "Data da venda",
      render: (value) => new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      label: "Total de produtos",
      dataIndex: "totalProducts",
      key: "totalProducts",
      align: "left",
      render: (value, row) => (
        <>
          {value}
          <span className="italic text-sm"> ({row.soldProducts.split(", ").length} diferentes)</span>
        </>
      ),
    },
    {
      key: "soldProducts",
      dataIndex: "soldProducts",
      label: "Produtos vendidos",
      align: "left",
      textOverflow: true,
    },
    {
      key: "amount_in_cents",
      dataIndex: "amount_in_cents",
      label: "Preço total",
      render: (value) =>
        (value / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },
    {
      key: "actions",
      label: "Ações",
      align: "center",
      render: (_, row) => (
        <div className="text-center">
          <button
            className="inline-flex items-center justify-center w-6 h-6 transition-colors hover:text-gray-400"
            title="Editar"
            onClick={() =>
              openModal({
                title: "Editar venda n° " + row.id,
                modalElement: <SaleForm id={row.id} />,
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
      )
    }
  ]

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

      <main className="px-4 py-6">
        <Table<typeof sales[0]>
          columns={tableColumns}
          data={sales}
        />
      </main>
    </div>
  );
}
