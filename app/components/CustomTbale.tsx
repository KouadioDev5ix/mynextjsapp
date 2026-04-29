interface TableHearder<T> {
  key: keyof T;
  header: string;
  hearderClassName?: string;

  renderCell: (value: any, row: T) => React.ReactNode;
}


