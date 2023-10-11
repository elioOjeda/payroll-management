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
import { confirmationModal } from "../../../utils/functions/confirmationModal";
import { showCustomNotification } from "../../../utils/functions/showCustomNotification";
import { createPayroll } from "../../../api/payroll";
import { queryClient } from "../../../api/supabase";
import { useNavigate } from "react-router-dom";

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
  companyId?: string;
  payrollDate: Date;
};

export default function GeneratePayrollTable({
  companyId,
  payrollDate,
}: Props) {
  const { isSuperAdmin, user } = useAppContext();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [
      QueryKey.CalculateMonthlyPayroll,
      {
        where: {
          companyId: isSuperAdmin ? companyId : user?.user_metadata?.company_id,
          payrollDate,
        },
      },
    ],
    queryFn: () =>
      calculateMonthlyPayroll({
        where: {
          companyId: isSuperAdmin ? companyId : user?.user_metadata?.company_id,
          payrollDate,
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

  const currentCompanyId = user?.user_metadata?.company_id;

  const handleClick = async () => {
    if (isSuperAdmin && !companyId) {
      return showCustomNotification("warning", {
        title: "Cierre nómina",
        message: "Por favor selecciona una empresa.",
      });
    }

    if (!data) return;

    const isConfirmed = await confirmationModal({
      title: "Cierre nómina",
      message: "¿Estás seguro de que deseas efectuar el cierre de esta nómina?",
    });

    if (!isConfirmed) return;

    await createPayroll<PayrollData>({
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      payrollDate,
      payrollData: data,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Payrolls] });

    navigate("/payrolls");

    showCustomNotification("success", {
      title: "Cierre nómina",
      message: "Cierre de nómina efectuado correctamente.",
    });
  };

  return (
    <Container>
      <Button
        color="blue"
        leftIcon={<FaMoneyCheckDollar />}
        onClick={handleClick}
        style={{ width: 250 }}
      >
        Cierre nómina
      </Button>

      <Table table={table} />
    </Container>
  );
}
