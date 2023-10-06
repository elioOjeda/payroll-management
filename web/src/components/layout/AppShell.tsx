import { AppShell as UIAppShell, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactElement;
};

export default function AppShelll({ children }: Props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <UIAppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      footer={<Footer />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </UIAppShell>
  );
}
