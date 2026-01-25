import { Sale } from "@api/sale";
import { ConfirmDeletePopup } from "@components/confirm-delete-popup";
import { PageTopbar } from "@components/page-topbar";
import { SaleDetails } from "@components/sales/sale-details";
import { SaleForm } from "@components/sales/sale-form";
import Table from "@components/table/table";
import { ColumnType } from "@components/table/types";
import { useModal } from "@hooks/use-modal";
import { Button } from "flowbite-react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

export function Sales() {
  const { openModal } = useModal();

  const [sales, setSales] = useState<Sale[]>([]);

  const tableColumns: ColumnType<Sale>[] = [
    {
      key: "details",
      label: "Detalhes",
      align: "center",
      render: (_, row) => (
        <button
          className="rounded bg-white h-8 w-8 border border-zinc-300 inline-flex items-center justify-center transition-colors hover:border-zinc-400"
          title="Ver detalhes"
          onClick={() =>
            openModal({
              title: "Detalhes da venda n° " + row.id,
              modalElement: <SaleDetails id={row.id} />,
            })
          }
        >
          <Search size={16} />
        </button>
      ),
    },
    {
      key: "id",
      dataIndex: "id",
      label: "ID",
      align: "center",
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      label: "Data da venda",
      align: "center",
      render: (value) => new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      label: "Total de produtos",
      key: "totalProducts",
      render: (_, row) => (
        <>
          {row.products.reduce((acc, product) => acc + product.quantity, 0)}
          <span className="italic text-sm"> ({row.products.length} diferentes)</span>
        </>
      ),
    },
    {
      key: "soldProducts",
      label: "Produtos vendidos",
      align: "left",
      textOverflow: true,
      render: (_, row) => row.products.map((product) => product.name).join(", "),
    },
    {
      key: "amountInCents",
      label: "Preço total",
      render: (_, row) =>
        (
          row.products.reduce((acc, product) => acc + product.quantity * product.priceInCents, 0) /
          100
        ).toLocaleString("pt-BR", {
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
            className="inline-flex items-center justify-center w-6 h-6 transition-all hover:scale-125"
            title="Editar"
            onClick={() =>
              openModal({
                title: "Editar venda n° " + row.id,
                modalElement: <SaleForm id={row.id} />,
              })
            }
          >
            <Pencil size={18} />
          </button>

          <button
            className="ml-2 w-6 h-6 inline-flex items-center justify-center transition-all hover:scale-125"
            title="Excluir"
            onClick={() =>
              openModal({
                title: "Confirmar exclusão",
                modalElement: <ConfirmDeletePopup onDelete={() => {}} />,
              })
            }
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <PageTopbar title="Vendas">
        <Button
          onClick={() =>
            openModal({
              title: "Adicionar venda",
              modalElement: <SaleForm />,
            })
          }
        >
          <Plus size={18} className="mr-2" />
          Novo
        </Button>
      </PageTopbar>

      <main className="px-4 py-6">
        <Table<(typeof sales)[0]> columns={tableColumns} data={sales} />
      </main>
    </div>
  );
}
