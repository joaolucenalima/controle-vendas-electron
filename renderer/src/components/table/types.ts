export type ColumnType<T> = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  textOverflow?: boolean;
} & (
  | {
      dataIndex: keyof T;
      render?: (value: any, row: T) => React.ReactNode;
    }
  | {
      dataIndex?: undefined;
      render: (value: any, row: T) => React.ReactNode;
    }
);

export type TableProps<T> = {
  data: T[];
  columns: ColumnType<T>[];
  onChange?: (params: PaginationProps) => void;
};

export type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
};
