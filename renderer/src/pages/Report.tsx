import { Plus } from "lucide-react";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";

export function Report() {
  return (
    <PageTopbar className="flex items-center justify-between">
      <h1 className="text-lg font-medium">Report</h1>

      <PrimaryButton>
        <Plus size={18} />
        Add
      </PrimaryButton>
    </PageTopbar>
  )
}