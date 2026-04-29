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

export function CustomTble<T extends Record<string, any>>({
  data,
  colums,
  getRowKey,
  actions,
  filterKeys,
  filterLabel,
  filterPlaceholder,
  itemsPerPage,
  searchKeys,
  searchPlaceholder,
}: CustomTableProps<T>) {

  return (
    <div>
      
    </div>
  )
}
