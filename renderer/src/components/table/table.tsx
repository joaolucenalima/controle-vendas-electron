import {
  Button,
  createTheme,
  Table as FlowbiteTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
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
      return Array.from({ length: totalPages || 1 }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const tableTheme = createTheme({
    table: {
      head: {
        cell: { base: "bg-white" },
      },
    },
  }).table;

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
      <div className="col-span-3 border border-gray-300 rounded-lg overflow-x-auto bg-white">
        <FlowbiteTable hoverable theme={tableTheme}>
          <colgroup>
            {columns.map((column) => (
              <col
                key={column.key}
                style={{
                  ...(column.width && { width: column.width }),
                  ...(column.minWidth && { minWidth: column.minWidth }),
                }}
              />
            ))}
          </colgroup>

          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeadCell key={column.key}>
                  <span className={`text-${column.align || "left"} text-sm`}>{column.label}</span>
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((dataItem, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key + "_" + index}
                    className={`text-${column.align || "left"}${
                      column.textOverflow ? "overflow-ellipsis whitespace-nowrap" : ""
                    }`}
                  >
                    {column.render
                      ? column.render(dataItem[column.key], dataItem)
                      : String(dataItem[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </FlowbiteTable>

        {data.length == 0 && <p className="text-center my-6">Nenhum dado encontrado</p>}
      </div>

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
        <Button
          color="alternative"
          size="sm"
          onClick={() => setPagination((prev) => ({ ...prev, page: 1 }))}
          title="Ir para a primeira página"
          disabled={pagination.page == 1}
        >
          <ChevronsLeft size={18} />
        </Button>

        <Button
          color="alternative"
          size="sm"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
          title="Ir para a página anterior"
          disabled={pagination.page <= 1}
        >
          <ChevronLeft size={18} />
        </Button>

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
            <Button
              color={isActualPage ? "" : "alternative"}
              size="sm"
              disabled={isActualPage}
              onClick={() => setPagination((prev) => ({ ...prev, page }))}
              key={page}
            >
              {page}
            </Button>
          );
        })}

        <Button
          color="alternative"
          size="sm"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
          title="Ir para a próxima página"
          disabled={pagination.page >= totalPages}
        >
          <ChevronRight size={18} />
        </Button>

        <Button
          color="alternative"
          size="sm"
          onClick={() => setPagination((prev) => ({ ...prev, page: totalPages }))}
          title="Ir para a última página"
          disabled={pagination.page == totalPages || !totalPages}
        >
          <ChevronsRight size={18} />
        </Button>
      </div>

      <span className="self-center justify-self-end">
        <strong>
          {paginationStart} - {paginationEnd || 1}
        </strong>{" "}
        / {pagination.totalItems} resultados
      </span>
    </div>
  );
}
