import { Plus } from "lucide-react";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";

export function Expenses() {
  return (
    <>
      <PageTopbar title="Gastos">
        <PrimaryButton>
          <Plus size={18} />
          Novo
        </PrimaryButton>
      </PageTopbar>
    </>
  );
}
