import React from "react";
import { Drawer as UIDrawer, DrawerProps } from "@mantine/core";

type Props = Omit<DrawerProps, "onClose"> & {
  opened: boolean;
  close: () => void;
};

export default function Drawer({ children, opened, close, ...props }: Props) {
  return (
    <UIDrawer
      opened={opened}
      position="right"
      onClose={close}
      overlayProps={{ opacity: 0.5, blur: 4 }}
      {...props}
    >
      {children}
    </UIDrawer>
  );
}
