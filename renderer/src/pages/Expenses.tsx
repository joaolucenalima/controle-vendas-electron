import { Plus } from "lucide-react";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";

export function Expenses() {
  return (
    <>
      <PageTopbar className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Gastos</h1>

        <PrimaryButton>
          <Plus size={18} />
          Novo
        </PrimaryButton>
      </PageTopbar>
    </>
  )
}