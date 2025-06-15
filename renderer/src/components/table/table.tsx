import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { StyledSelect } from "../styled-select";
import { PaginationProps, TableProps } from "./types";

export default function Table<T extends Record<string, any>>({ data, columns, onChange }: TableProps<T>) {
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    pageSize: 10,
    totalItems: data.length,
  });

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
      />

      <div className="self-center justify-self-center flex items-center gap-3">
        <button className="h-6 w-6 inline-flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>

        <button className="h-8 w-10 inline-flex items-center justify-center bg-green-600 text-white border border-gray-400 rounded hover:border-gray-500">
          1
        </button>

        <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
          2
        </button>

        <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
          3
        </button>

        <span className="text-xl">...</span>

        <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
          9
        </button>

        <button className="h-8 w-10 inline-flex items-center justify-center bg-white border border-gray-400 rounded hover:border-gray-500">
          10
        </button>

        <button className="h-6 w-6 inline-flex items-center justify-center">
          <ChevronRight size={18} />
        </button>
      </div>

      <span className="self-center justify-self-end">
        <strong>
          {pagination.page + pagination.pageSize} - {pagination.page * pagination.pageSize}
        </strong>{" "}
        / {pagination.totalItems} resultados
      </span>
    </div>
  );
}
