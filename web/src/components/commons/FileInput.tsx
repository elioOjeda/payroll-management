import { FileInput as UIFileInput, FileInputProps } from "@mantine/core";

type Props = FileInputProps & {};

export default function FileInput({ ...props }: Props) {
  return <UIFileInput {...props} />;
}
