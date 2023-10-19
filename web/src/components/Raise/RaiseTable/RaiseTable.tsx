import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { RaiseDateCell } from "./Cells";
import { Raise, getRaises } from "../../../api/raise";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  employeeId?: string;
};

export default function RaiseTable({ employeeId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Raises, { where: { employeeId } }],
    queryFn: () => getRaises({ where: { employeeId } }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "employee_job.job.department.name",
        header: "Departamento",
      },
      {
        accessorKey: "employee_job.job.title",
        header: "Puesto laboral",
      },
      {
        accessorKey: "raise_amount",
        header: "Cantidad aumentada (GTQ)",
      },
      {
        accessorKey: "raise_date",
        header: "Fecha",
        cell: RaiseDateCell,
      },
      {
        accessorKey: "description",
        header: "Descripción",
      },
    ],
    []
  );

  const table = useTable<Raise>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  if (!data) return null;

  const exportData = data.map(
    ({
      employee_job: {
        job: {
          title,
          department: { name },
        },
      },
      raise_amount,
      raise_date,
      description,
    }) => ({
      Departamento: name,
      "Puesto laboral": title,
      "Cantidad aumentada (GTQ)": raise_amount,
      Fecha: raise_date,
      Descripción: description,
    })
  );

  return (
    <Container>
      <Table table={table} exportData={exportData} exportFilename="aumentos" />
    </Container>
  );
}
