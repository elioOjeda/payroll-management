import { TextInput, TextInputProps } from '@mantine/core'

type Props = TextInputProps & {}

export default function Input({ ...props}: Props) {
  return (
    <TextInput {...props} />
  )
}
