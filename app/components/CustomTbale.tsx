import React from "react";

interface TableHearder<T> {
  key: keyof T;
  header: string;
  hearderClassName?: string;
  renderCell: (value: any, row: T) => React.ReactNode;
}
interface Action<T> {
  icon: React.ReactNode;
  funct: (row: T) => void;
  varriant?: "Default" | "Danger";
  title: string;
}

interface CustomTableProps<T> {
  data: T[];
  colums: TableHearder<T>[];
  actions?: Action<T>[];
  searchKeys?: (keyof T)[];
  filterKeys?: keyof T;
  filterLabel?: string;
  filterPlaceholder?: string;
  searchPlaceholder?: string;
  getRowKey: (row: T) => number | string;
  itemsPerPage?: number;
}

export function CustomTable<T extends Record<string, any>>({
  data,
  colums,
  getRowKey,
  actions,
  filterKeys,
  filterLabel = "Filtrer par catégorie",
  filterPlaceholder,
  itemsPerPage = 5,
  searchKeys,
  searchPlaceholder = "Rechercher...",
}: CustomTableProps<T>) {
  const [search, setSearch] = React.useState<string>("");
  const [filter, setFiler] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);

  const categories = React.useMemo(() => {
    if (!filterKeys) return [];

    return [...new Set(data.map((row) => String(row[filterKeys])))];
  }, [data, filterKeys]);

  const filer = React.useMemo(() => {}, []);

  return (
    <section>
      <div></div>
    </section>
  );
}
