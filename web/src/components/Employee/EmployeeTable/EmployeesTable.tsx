import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { Employee, getEmployees } from "../../../api/employee";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import {
  ActionsCell,
  CriminalRecordCell,
  DpiCopyCell,
  FirstNameCell,
  PoliceRecordCell,
  TitlePhotostaticCell,
} from "./Cells";

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
        accessorKey: "dpi_copy",
        header: "Fotocopia de DPI",
        cell: DpiCopyCell,
      },
      {
        accessorKey: "title_photostatic",
        header: "Fotostática de título",
        cell: TitlePhotostaticCell,
      },
      {
        accessorKey: "criminal_record",
        header: "Antecedentes penales",
        cell: CriminalRecordCell,
      },
      {
        accessorKey: "police_record",
        header: "Antecedentes policíacos",
        cell: PoliceRecordCell,
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

  const exportData = data.map(
    ({ first_name, last_name, address, phone, hire_date }) => ({
      Nombres: first_name,
      Apellidos: last_name,
      Dirección: address,
      Teléfono: phone,
      "Fecha de contratación": hire_date,
    })
  );

  return (
    <Container>
      <Table table={table} exportData={exportData} exportFilename="empleados" />
    </Container>
  );
}
