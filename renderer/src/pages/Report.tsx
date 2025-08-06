import { useState } from "react";
import Chart from "react-apexcharts";
import { Datepicker } from "../components/datepicker";
import { PageTopbar } from "../components/page-topbar";
import { Card } from "../components/report/card";
import { StyledSelect } from "../components/styled-select";
import { filterByPeriods } from "../utils/date-utils";

interface ReportFiltersType {
  initialDate: Date | null;
  endDate: Date | null;
}

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

const DEFAULT_PERIOD_OPTION = filterPeriodOptions[1];

export function Report() {
  const [filters, setFilters] = useState<ReportFiltersType>(
    filterByPeriods(DEFAULT_PERIOD_OPTION.value)
  );

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
              defaultValue={DEFAULT_PERIOD_OPTION}
              className="w-44"
            />
          </div>
        </div>

        <section className="mt-4 grid gap-4 grid-cols-5">
          <Card>
            <h1 className="text-center text-3xl font-semibold">Lucro total</h1>
            <h2 className="text-center text-2xl mt-4">R$ 3000</h2>
          </Card>

          <Card>
            <h1 className="text-center text-3xl font-semibold">Gastos planejados</h1>
            <h2 className="text-center text-2xl mt-4">R$ 3000</h2>
          </Card>

          <Card className="col-span-3">
            <Chart
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                yaxis: {
                  title: {
                    text: "Vendas",
                    style: {
                      fontSize: "16px",
                      fontWeight: 600,
                    },
                  },
                },
                xaxis: {
                  categories: [
                    "Arandela",
                    "Cúpula",
                    "Redondinha",
                    "Lustre",
                    "Luminária Cilíndrica",
                  ],
                },
                title: {
                  align: "center",
                  text: "Produtos vendidos",
                  style: {
                    fontSize: "20px",
                  },
                },
                noData: {
                  text: "Nenhum dado encontrado",
                  align: "center",
                  verticalAlign: "middle",
                  style: {
                    fontSize: "24px",
                  },
                },
              }}
              type="bar"
              height={400}
              width={"100%"}
              series={[
                {
                  name: "Vendas",
                  data: [20, 30, 40, 50, 60],
                },
                {
                  name: "Lucro",
                  data: [20, 30, 40, 50, 60],
                },
              ]}
            />
          </Card>

          <Card className="col-span-2">
            <Chart
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  type: "datetime",
                  categories: [
                    "2024-05-01",
                    "2024-05-08",
                    "2024-05-15",
                    "2024-05-22",
                    "2024-05-29",
                    "2024-06-05",
                  ],
                  tooltip: {
                    enabled: false,
                  },
                },
                markers: {
                  size: 5,
                  hover: {
                    size: 6,
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter(val, opts) {
                    return val.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    });
                  },
                },
                title: {
                  align: "center",
                  text: "Receitas e despesas",
                  style: {
                    fontSize: "20px",
                    fontWeight: 600,
                  },
                },
              }}
              type="line"
              height={300}
              width={"100%"}
              series={[
                {
                  name: "Receita",
                  data: [100, 2000, 2405, 1405, 543, 1804],
                },
                {
                  name: "Despesa",
                  data: [200, 500, 660, 467, 770, 890],
                },
              ]}
            />
          </Card>
        </section>
      </main>
    </div>
  );
}
