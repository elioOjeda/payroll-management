import {
  DatePickerInput as UIDatePickerInput,
  DatePickerInputProps,
} from "@mantine/dates";

type Props = DatePickerInputProps & {};

export default function DatePickerInput({ ...props }: Props) {
  return (
    <UIDatePickerInput
      dropdownType="modal"
      placeholder="dd/mm/aaaa"
      valueFormat="DD/MM/YYYY"
      {...props}
    />
  );
}
