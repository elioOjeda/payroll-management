import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { WorkAbsence, getWorkAbsences } from "../../../api/workAbsence";
import { ActionsCell, ApprovedCell, RequestCell, WithPayCell } from "./Cells";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  companyId?: string;
};

export default function WorkAbsencesTable({ companyId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.WorkAbsences, { where: { companyId } }],
    queryFn: () => getWorkAbsences({ where: { companyId } }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "employee.first_name",
        header: "Empleado",
      },
      {
        accessorKey: "type",
        header: "Tipo de ausencia",
      },
      {
        accessorKey: "absence_date",
        header: "Fecha de ausencia",
      },
      {
        accessorKey: "request_url",
        header: "Solicitud",
        cell: RequestCell,
      },
      {
        accessorKey: "is_approved",
        header: "Aprobada",
        cell: ApprovedCell,
      },
      {
        accessorKey: "is_with_pay",
        header: "Goce de sueldo",
        cell: WithPayCell,
      },
      {
        header: "Acciones",
        cell: ActionsCell,
      },
    ],
    []
  );

  const table = useTable<WorkAbsence>({
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
