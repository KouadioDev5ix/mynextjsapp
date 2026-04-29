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

interface CustomTableProps <T>{
  data:T[],

}



