import { Checkbox as UICheckbox, CheckboxProps } from "@mantine/core";

type Props = CheckboxProps & {};

export default function Checkbox({ ...props }: Props) {
  return <UICheckbox {...props} />;
}
