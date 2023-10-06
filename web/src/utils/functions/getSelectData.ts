type Params<T> = {
  array?: T[];
  label: Extract<keyof T, string>;
  value: Extract<keyof T, string>;
};

export const getSelectData = <T>({ array, label, value }: Params<T>) => {
  return (
    array?.map((x) => ({
      value: String(x[value]),
      label: String(x[label]),
    })) ?? []
  );
};
