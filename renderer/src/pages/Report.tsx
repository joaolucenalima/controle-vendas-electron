import { useState } from "react";
import { Datepicker } from "../components/datepicker";
import { PageTopbar } from "../components/page-topbar";
import { StyledSelect } from "../components/styled-select";
import { filterByPeriods } from "../utils/date-utils";

interface ReportFiltersType {
  initialDate: Date | null;
  endDate: Date | null;
}

export function Report() {
  const [filters, setFilters] = useState<ReportFiltersType>(filterByPeriods("1M"));

  const filterPeriodOptions = [
    {
      value: "1W",
      label: "1 semana",
    },
    {
      value: "1M",
      label: "1 mês",
    },
    {
      value: "2M",
      label: "2 meses",
    },
    {
      value: "3M",
      label: "3 meses",
    },
    {
      value: "6M",
      label: "6 meses",
    },
    {
      value: "1Y",
      label: "1 ano",
    },
    {
      value: "custom",
      label: "Personalizado",
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <PageTopbar className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Relatórios</h1>
      </PageTopbar>

      <main className="p-4">
        <div className="flex gap-4 items-end">
          <div className="w-48">
            <label htmlFor="initialDate" className="block mb-1">
              Data inicial
            </label>
            <Datepicker
              placeholderText="Insira a data inicial"
              id="initialDate"
              selected={filters.initialDate}
              onChange={(date) =>
                setFilters((prev) => ({
                  ...prev,
                  initialDate: date,
                }))
              }
            />
          </div>

          <div className="w-48">
            <label htmlFor="endDate" className="block mb-1">
              Data final
            </label>
            <Datepicker
              placeholderText="Insira a data final"
              id="endDate"
              selected={filters.endDate}
              onChange={(date) =>
                setFilters((prev) => ({
                  ...prev,
                  endDate: date,
                }))
              }
            />
          </div>

          <div className="h-9 border-l border-gray-300 mx-1" />

          <div>
            <p className="mb-1">Período:</p>
            <StyledSelect
              options={filterPeriodOptions}
              onChange={(selected) => {
                if (selected?.value == "custom") return;
                setFilters(filterByPeriods(selected?.value));
              }}
              defaultValue={filterPeriodOptions[1]}
              className="w-44"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
