import { Title } from "@mantine/core";
import styled from "styled-components";
import Button from "../components/commons/Button";
import { FaCalendar, FaCirclePlus } from "react-icons/fa6";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { showCustomNotification } from "../utils/functions/showCustomNotification";
import { lastDayOfMonth } from "date-fns";
import { formatDateToUTC } from "../utils/functions/formatDateToUTC";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function PayrollsPage() {
  const [value, setValue] = useState<Date | null>(null);

  const handleClick = () => {
    if (!value) {
      return showCustomNotification("warning", {
        title: "Seleccione un mes antes de continuar...",
      });
    }

    showCustomNotification("success", { title: "Generando nomina mensual..." });
    showCustomNotification("success", {
      title: "Primer dia",
      message: formatDateToUTC(value),
    });
    showCustomNotification("success", {
      title: "Ultimo dia",
      message: formatDateToUTC(lastDayOfMonth(value)),
    });
  };

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

        <Button
          color="blue"
          leftIcon={<FaCirclePlus />}
          onClick={handleClick}
          style={{ width: "250px" }}
        >
          Generar nómina mensual
        </Button>
      </div>

      <h1>Tabla con resultados</h1>
    </Container>
  );
}
