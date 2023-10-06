import {
  Burger,
  MediaQuery,
  Title,
  Header as UIHeader,
  useMantineTheme,
} from "@mantine/core";
import React, { Dispatch } from "react";
import { FaFileInvoiceDollar, FaPowerOff } from "react-icons/fa6";
import Button from "../commons/Button";
import { signOut } from "../../api/auth";

type Props = {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ opened, setOpened }: Props) {
  const theme = useMantineTheme();

  const handleClick = async () => await signOut();

  return (
    <UIHeader
      height={{ base: 50, md: 70 }}
      p="md"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <div style={{ display: "flex", gap: "8px" }}>
          <FaFileInvoiceDollar size={24} />

          <Title order={4}>Gestión de Nóminas</Title>
        </div>
      </div>

      <Button
        color="red"
        leftIcon={<FaPowerOff />}
        onClick={handleClick}
        variant="subtle"
      >
        Cerrar sesión
      </Button>
    </UIHeader>
  );
}
