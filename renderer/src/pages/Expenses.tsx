import { Plus } from "lucide-react";
import { Button } from "../components/button";
import { PageTopbar } from "../components/page-topbar";

export function Expenses() {
  return (
    <>
      <PageTopbar title="Gastos">
        <Button>
          <Plus size={18} />
          Novo
        </Button>
      </PageTopbar>
    </>
  );
}
