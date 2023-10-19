import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { Overtime, getOvertime } from "../../../api/overtime";
import { DateCell } from "./Cells";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  employeeId?: string;
};

export default function OvertimeTable({ employeeId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Overtime, { where: { employeeId } }],
    queryFn: () => getOvertime({ where: { employeeId } }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "type",
        header: "Tipo de hora extra",
      },
      {
        accessorKey: "date",
        header: "Fecha",
        cell: DateCell,
      },
      {
        accessorKey: "quantity",
        header: "Cantidad",
      },
    ],
    []
  );

  const table = useTable<Overtime>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  if (!data) return null;

  const exportData = data.map(({ type, date, quantity }) => ({
    "Tipo de hora extra": type,
    Fecha: date,
    Cantidad: quantity,
  }));

  return (
    <Container>
      <Table
        table={table}
        exportData={exportData}
        exportFilename="tiempo-extra"
      />
    </Container>
  );
}
