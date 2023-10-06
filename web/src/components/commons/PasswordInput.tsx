import {
  PasswordInput as UIPasswordInput,
  PasswordInputProps,
} from "@mantine/core";

type Props = PasswordInputProps & {};

export default function PasswordInput({ ...props }: Props) {
  return <UIPasswordInput {...props} />;
}
