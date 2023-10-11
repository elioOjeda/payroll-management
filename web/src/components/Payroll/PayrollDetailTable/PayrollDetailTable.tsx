import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export type PayrollData = {
  full_name: string;
  base_salary: number;
  days_worked: number;
  absences: number;
  absences_discount: number;
  igss_discount: number;
  simple_overtime_count: number;
  simple_overtime_total: number;
  double_overtime_count: number;
  double_overtime_total: number;
  total_liquid: number;
};

type Props = {
  data: Array<PayrollData>;
};

export default function PayrollDetailTable({ data }: Props) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "full_name",
        header: "Empleado",
      },
      {
        accessorKey: "base_salary",
        header: "Salario base (GTQ)",
      },
      {
        accessorKey: "days_worked",
        header: "Días trabajados",
      },
      {
        accessorKey: "absences",
        header: "Ausencias sin goce de sueldo",
      },
      {
        accessorKey: "absences_discount",
        header: "Descuento por ausencias (GTQ)",
      },
      {
        accessorKey: "simple_overtime_count",
        header: "Horas extras simples (HES)",
      },
      {
        accessorKey: "simple_overtime_total",
        header: "Total HES (GTQ)",
      },
      {
        accessorKey: "double_overtime_count",
        header: "Horas extras dobles (HED)",
      },
      {
        accessorKey: "double_overtime_total",
        header: "Total HED (GTQ)",
      },
      {
        accessorKey: "igss_discount",
        header: "Descuento de IGSS",
      },
      {
        accessorKey: "total_liquid",
        header: "Total líquido (GTQ)",
      },
    ],
    []
  );

  const table = useTable<PayrollData>({
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
