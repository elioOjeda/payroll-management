import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import {
  CalculateMonthlyPayroll,
  calculateMonthlyPayroll,
} from "../../../api/dbFunctions/calculateMonthlyPayroll";
import useAppContext from "../../../hooks/useAppContext";
import { QueryKey } from "../../../utils/constants";
import Button from "../../commons/Button";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  companyId?: string;
  month: Date;
};

export default function PayrollTable({ companyId, month }: Props) {
  const { isSuperAdmin, user } = useAppContext();
  const showPayrollClosure = true;

  const getPayroll = (month: Date) => {
    // Se hace una busqueda en la base de datos en la tabla nominas y si ya existe una nomina con
    // ese mes y año, entonces se debera mostrar un error que indique que ya se genero esa nomina.
  };

  const { data } = useQuery({
    queryKey: [
      QueryKey.CalculateMonthlyPayroll,
      {
        where: {
          companyId: isSuperAdmin ? companyId : user?.user_metadata?.company_id,
          month,
        },
      },
    ],
    queryFn: () =>
      calculateMonthlyPayroll({
        where: {
          companyId: isSuperAdmin ? companyId : user?.user_metadata?.company_id,
          month,
        },
      }),
  });

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

  const table = useTable<CalculateMonthlyPayroll[0]>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  return (
    <Container>
      {!showPayrollClosure && (
        <Button
          color="blue"
          leftIcon={<FaMoneyCheckDollar />}
          onClick={() => undefined}
          style={{ width: 250 }}
        >
          Cierre nómina
        </Button>
      )}

      <Table table={table} />
    </Container>
  );
}
