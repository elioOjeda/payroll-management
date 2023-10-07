import {
  Burger,
  MediaQuery,
  Title,
  Header as UIHeader,
  useMantineTheme,
} from "@mantine/core";
import React, { Dispatch } from "react";
import { FaPeopleRoof, FaPowerOff } from "react-icons/fa6";
import Button from "../commons/Button";
import { signOut } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../utils/constants";
import useAppContext from "../../hooks/useAppContext";
import { getCompany } from "../../api/company";

type Props = {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const { isSuperAdmin, user } = useAppContext();

  const { data } = useQuery({
    queryKey: [
      QueryKey.Company,
      { where: { companyId: user?.user_metadata?.company_id } },
    ],
    queryFn: () =>
      getCompany({ where: { companyId: user?.user_metadata?.company_id } }),
  });

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

        <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
          <FaPeopleRoof size={48} />

          <Title order={4}>
            {isSuperAdmin ? "Gestión de Nóminas" : data?.name}
          </Title>
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
