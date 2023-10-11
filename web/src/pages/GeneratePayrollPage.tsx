import { Title } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { FaCalendar } from "react-icons/fa6";
import styled from "styled-components";
import CompanySelect from "../components/CompanySelect";
import GeneratePayrollTable from "../components/Payroll/GeneratePayrollTable";
import { useState } from "react";
import useAppContext from "../hooks/useAppContext";
import { getPayrolls } from "../api/payroll";
import { isSameMonth, parseISO } from "date-fns";
import { showCustomNotification } from "../utils/functions/showCustomNotification";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function GeneratePayrollPage() {
  const [value, setValue] = useState<Date | null>(null);
  const [companyId, setCompanyId] = useState<string>();
  const { isSuperAdmin, user } = useAppContext();

  const handleChange = async (date: Date) => {
    const currentCompanyId = user?.user_metadata?.company_id;

    const payrolls = await getPayrolls({
      where: { companyId: isSuperAdmin ? companyId : currentCompanyId },
    });

    const closedPayroll = payrolls?.find((x) => {
      const payrollDate = x.payroll_date;

      return isSameMonth(
        parseISO(new Date(payrollDate.replace(/-/g, "/")).toISOString()),
        date
      );
    });

    if (closedPayroll) {
      showCustomNotification("warning", {
        title: "Nómina cerrada",
        message:
          "La nómina que estás intentando generar ya ha sido cerrada. Puedes consultarla en el listado de nóminas",
      });

      return setValue(null);
    }

    setValue(date);
  };

  return (
    <Container>
      <Title>Generar nómina</Title>

      <div style={{ alignItems: "flex-end", display: "flex", gap: 16 }}>
        <MonthPickerInput
          clearable
          dropdownType="modal"
          rightSection={<FaCalendar />}
          label="Selecciona un mes"
          placeholder="Selecciona un mes"
          value={value}
          onChange={handleChange}
          style={{ width: "250px" }}
        />

        {isSuperAdmin && (
          <CompanySelect
            clearable={false}
            label="Empresa"
            onChange={setCompanyId}
            placeholder="Seleccione una empresa"
            required
            value={companyId}
          />
        )}
      </div>

      {value && (
        <GeneratePayrollTable
          companyId={isSuperAdmin ? companyId : undefined}
          payrollDate={value}
        />
      )}
    </Container>
  );
}
