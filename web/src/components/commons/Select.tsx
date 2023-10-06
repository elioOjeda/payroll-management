import {
  Select as UISelect,
  SelectProps as UISelectProps,
} from "@mantine/core";

export type SelectProps<T extends string> = Omit<UISelectProps, "onChange"> & {
  onChange: (e: T) => void;
};

export default function Select<T extends string>({
  onChange,
  ...props
}: SelectProps<T>) {
  return (
    <UISelect
      clearable
      nothingFound="No hay resultados"
      onChange={onChange}
      placeholder="- Selecciona un registro -"
      searchable
      {...props}
    />
  );
}
