type CustumSelectProps<T> = {
  htmlFor?: string;
  id?: string;
  label?: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  placeHoder: string;
  getKey?: (item: T) => number | string;
  selectClassName?: string;
  labelClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
