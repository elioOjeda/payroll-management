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
        accessorKey: "date",
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

  return (
    <Container>
      <Table table={table} />
    </Container>
  );
}
