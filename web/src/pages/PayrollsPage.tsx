import { Title } from "@mantine/core";
import styled from "styled-components";
import { FaCalendar } from "react-icons/fa6";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import PayrollTable from "../components/Payroll/PayrollTable";
import useAppContext from "../hooks/useAppContext";
import CompanySelect from "../components/CompanySelect";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function PayrollsPage() {
  const [value, setValue] = useState<Date | null>(null);
  const [companyId, setCompanyId] = useState<string>();
  const { isSuperAdmin } = useAppContext();

  return (
    <Container>
      <Title>Nóminas</Title>

      <div style={{ alignItems: "flex-end", display: "flex", gap: 16 }}>
        <MonthPickerInput
          clearable
          dropdownType="modal"
          rightSection={<FaCalendar />}
          label="Selecciona un mes"
          placeholder="Selecciona un mes"
          value={value}
          onChange={setValue}
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
        <PayrollTable
          companyId={isSuperAdmin ? companyId : undefined}
          month={value}
        />
      )}
    </Container>
  );
}
