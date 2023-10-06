import { Button as UIButton, ButtonProps } from "@mantine/core";
import { HtmlHTMLAttributes } from "react";

type Props = ButtonProps & HtmlHTMLAttributes<HTMLButtonElement> & {};

export default function Button({ children, ...props }: Props) {
  return <UIButton {...props}>{children}</UIButton>;
}
