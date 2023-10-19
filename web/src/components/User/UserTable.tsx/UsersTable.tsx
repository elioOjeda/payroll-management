import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { ActionsCell, AdminCell } from "./Cells";
import { User, getUsers } from "../../../api/users";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  companyId?: string;
};

export default function UsersTable({ companyId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Users, { where: { companyId } }],
    queryFn: () => getUsers({ where: { companyId } }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "first_name",
        header: "Nombres",
      },
      {
        accessorKey: "last_name",
        header: "Apellidos",
      },
      {
        accessorKey: "email",
        header: "Correo electrónico",
      },
      {
        accessorKey: "is_admin",
        header: "Es admin",
        cell: AdminCell,
      },
      {
        header: "Acciones",
        cell: ActionsCell,
      },
    ],
    []
  );

  const table = useTable<User>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  if (!data) return null;

  const exportData = data.map(({ first_name, last_name, email, is_admin }) => ({
    Nombres: first_name,
    Apellidos: last_name,
    "Correo electrónico": email,
    "Es administrador": is_admin,
  }));

  return (
    <Container>
      <Table table={table} exportData={exportData} exportFilename="usuarios" />
    </Container>
  );
}
