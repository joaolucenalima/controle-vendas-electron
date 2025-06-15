import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { StyledSelect } from "../styled-select";
import { PaginationProps, TableProps } from "./types";

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  onChange,
}: TableProps<T>) {
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    pageSize: 10,
    totalItems: data.length,
  });

  const paginationStart = (pagination.page - 1) * pagination.pageSize + 1;
  const paginationEnd = Math.min(pagination.page * pagination.pageSize, pagination.totalItems);
  const totalPages = Math.ceil(pagination.totalItems / pagination.pageSize);

  const generatePaginationButtons = () => {
    const currentPage = pagination.page;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  useEffect(() => {
    if (onChange) {
      onChange({
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: pagination.totalItems,
      });
    }
  }, [data, pagination]);

  return (
    <div className="w-full max-h-full grid grid-cols-3 grid-rows-[auto_1fr] gap-y-4">
      <table className="w-full border border-zinc-300 border-collapse rounded col-span-3">
        <thead>
          <tr className="bg-[#fafafa] *:border *:border-zinc-300 *:font-normal *:py-3 *:px-4 *:rounded">
            {columns.map((column) => (
              <th key={column.key} className={`text-${column.align || "left"}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((dataItem, index) => (
            <tr key={index} className="*:border *:border-zinc-300 *:py-2 *:px-4">
              {columns.map((column) => (
                <td
                  key={column.key + "_" + index}
                  className={`text-${column.align || "left"} ${
                    column.textOverflow ? "overflow-ellipsis whitespace-nowrap" : ""
                  }`}
                >
                  {column.render
                    ? column.render(dataItem[column.key], dataItem)
                    : String(dataItem[column.key])}
                </td>
              ))}
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
        className="max-w-72"
        onChange={(option) => {
          setPagination((prev) => ({
            ...prev,
            pageSize: option?.value ?? 10,
          }));
        }}
      />

      <div className="self-center justify-self-center flex items-center gap-3">
        <button
          className="h-6 w-6 inline-flex items-center justify-center disabled:cursor-not-allowed disabled:text-gray-400"
          onClick={() => setPagination((prev) => ({ ...prev, page: 1 }))}
          title="Ir para a primeira página"
          disabled={pagination.page == 1}
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          className="h-6 w-6 inline-flex items-center justify-center disabled:cursor-not-allowed disabled:text-gray-400"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
          title="Ir para a página anterior"
          disabled={pagination.page <= 1}
        >
          <ChevronLeft size={18} />
        </button>

        {generatePaginationButtons().map((page, index) => {
          if (typeof page === "string") {
            return (
              <span
                className="h-8 w-10 inline-flex items-center justify-center text-xl"
                key={"ellipsis_" + index}
              >
                {page}
              </span>
            );
          }

          const isActualPage = pagination.page === page;

          return (
            <button
              className={`h-8 w-10 inline-flex items-center justify-center ${
                isActualPage ? "bg-green-600 text-white" : "bg-white"
              } border border-gray-400 rounded hover:border-gray-500`}
              disabled={isActualPage}
              onClick={() => setPagination((prev) => ({ ...prev, page }))}
              key={page}
            >
              {page}
            </button>
          );
        })}

        <button
          className="h-6 w-6 inline-flex items-center justify-center disabled:cursor-not-allowed disabled:text-gray-400"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
          title="Ir para a próxima página"
          disabled={pagination.page >= totalPages}
        >
          <ChevronRight size={18} />
        </button>

        <button
          className="h-6 w-6 inline-flex items-center justify-center disabled:cursor-not-allowed disabled:text-gray-400"
          onClick={() => setPagination((prev) => ({ ...prev, page: totalPages }))}
          title="Ir para a última página"
          disabled={pagination.page == totalPages}
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      <span className="self-center justify-self-end">
        <strong>
          {paginationStart} - {paginationEnd}
        </strong>{" "}
        / {pagination.totalItems} resultados
      </span>
    </div>
  );
}
