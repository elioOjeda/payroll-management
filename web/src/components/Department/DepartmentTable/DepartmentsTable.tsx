import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { ActionsCell } from "./Cells";
import { Department, getDepartments } from "../../../api/department";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  companyId?: string;
};

export default function DepartmentsTable({ companyId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Deparments, { where: { companyId } }],
    queryFn: () => getDepartments({ where: { companyId } }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
      },
      {
        accessorKey: "description",
        header: "Descripción",
      },
      {
        header: "Acciones",
        cell: ActionsCell,
      },
    ],
    []
  );

  const table = useTable<Department>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  if (!data) return null;

  const exportData = data.map(({ name, description }) => ({
    Nombre: name,
    Descripción: description,
  }));

  return (
    <Container>
      <Table
        table={table}
        exportData={exportData}
        exportFilename="departamentos"
      />
    </Container>
  );
}
