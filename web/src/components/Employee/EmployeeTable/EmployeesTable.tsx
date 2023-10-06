import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { Employee, getEmployees } from "../../../api/employee";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { ActionsCell } from "./Cells/ActionsCell";
import FirstNameCell from "./Cells/FirstNameCell";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  companyId?: string;
};

export default function EmployeesTable({ companyId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Employees, { where: { companyId } }],
    queryFn: () => getEmployees({ where: { companyId } }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "first_name",
        header: "Nombres",
        cell: FirstNameCell,
      },
      {
        accessorKey: "last_name",
        header: "Apellidos",
      },
      {
        accessorKey: "address",
        header: "Dirección",
      },
      {
        accessorKey: "phone",
        header: "Teléfono",
      },
      {
        accessorKey: "hire_date",
        header: "Fecha de contratación",
      },
      {
        header: "Acciones",
        cell: ActionsCell,
      },
    ],
    []
  );

  const table = useTable<Employee>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  if (!data) return null;

  const exportColumns = [
    {
      id: "first_name",
      displayName: "Nombres",
    },
    {
      id: "last_name",
      displayName: "Apellidos",
    },
    {
      id: "address",
      displayName: "Dirección",
    },
    {
      id: "phone",
      displayName: "Teléfono",
    },
    {
      id: "hire_date",
      displayName: "Fecha de contratación",
    },
  ];

  const exportData = data.map(
    ({ first_name, last_name, address, phone, hire_date }) => ({
      first_name,
      last_name,
      address,
      phone,
      hire_date,
    })
  );

  return (
    <Container>
      <Table
        table={table}
        exportColumns={exportColumns}
        exportData={exportData}
        exportFilename="empleados"
      />
    </Container>
  );
}
