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

  const exportData = data.map(
    ({
      full_name,
      base_salary,
      days_worked,
      absences,
      absences_discount,
      simple_overtime_count,
      simple_overtime_total,
      double_overtime_count,
      double_overtime_total,
      igss_discount,
      total_liquid,
    }) => ({
      "Nombre completo": full_name,
      "Salario base": base_salary,
      "Días trabajados": days_worked,
      "Ausencias sin goce de sueldo": absences,
      "Descuento por ausencias (GTQ)": absences_discount,
      "Horas extras simples (HES)": simple_overtime_count,
      "Total HES (GTQ)": simple_overtime_total,
      "Horas extras dobles (HED)": double_overtime_count,
      "Total HED (GTQ)": double_overtime_total,
      "Descuento de IGSS": igss_discount,
      "Total líquido (GTQ)": total_liquid,
    })
  );

  const table = useTable<PayrollData>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  return (
    <Container>
      <Table
        table={table}
        exportData={exportData}
        exportFilename="nomina-sueldos"
      />
    </Container>
  );
}
