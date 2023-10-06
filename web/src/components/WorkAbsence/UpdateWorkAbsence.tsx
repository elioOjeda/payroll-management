import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styled from "styled-components";
import Drawer from "../commons/Drawer";
import { Divider, Title } from "@mantine/core";
import { confirmationModal } from "../../utils/functions/confirmationModal";
import { QueryKey } from "../../utils/constants";
import { showCustomNotification } from "../../utils/functions/showCustomNotification";
import { queryClient } from "../../api/supabase";
import Input from "../commons/Input";
import DatePickerInput from "../commons/DatePickerInput";
import Button from "../commons/Button";
import { FaPencil } from "react-icons/fa6";
import { WorkAbsence, updateWorkAbsence } from "../../api/workAbsence";

type Props = {
  workAbsence: WorkAbsence;
  opened: boolean;
  close: () => void;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export default function UpdateWorkAbsence({
  workAbsence,
  opened,
  close,
}: Props) {
  const initialValues = {
    type: workAbsence.type,
  };

  const setInitialAbsenceDate = useCallback(() => {
    return workAbsence.absence_date
      ? new Date(workAbsence.absence_date)
      : undefined;
  }, [workAbsence.absence_date]);

  const [absenceDate, setAbsenceDate] = useState<Date | undefined>(
    setInitialAbsenceDate()
  );
  const [values, setValues] = useState(initialValues);

  const setInitialValues = () => {
    setValues(initialValues);
    setAbsenceDate(setInitialAbsenceDate());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAbsenceDateChange = (date: Date) => {
    setAbsenceDate(date);
  };

  const handleClose = () => {
    setInitialValues();
    close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!absenceDate) return;

    const { id: workAbsenceId } = workAbsence;

    const isConfirmed = await confirmationModal({
      title: "Actualizar",
      message:
        "¿Estás seguro de que deseas actualizar esta solicitud de ausencia laboral?",
    });

    if (!isConfirmed) return;

    const { type } = values;

    await updateWorkAbsence({
      workAbsenceId,
      type,
      absenceDate,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.WorkAbsences] });

    showCustomNotification("success", {
      title: "Actualizar",
      message: "Solicitud de ausencia laboral actualizada correctamente.",
    });

    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Actualizar solicitud de ausencia laboral</Title>

        <Divider my="xs" />

        <Input
          label="Tipo de ausencia"
          name="type"
          onChange={handleChange}
          placeholder="Tipo de ausencia"
          required
          value={values.type}
        />

        <DatePickerInput
          clearable
          label="Fecha de ausencia"
          name="absenceDate"
          onChange={handleAbsenceDateChange}
          required
          value={absenceDate}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaPencil />} type="submit">
          Actualizar
        </Button>
      </StyledForm>
    </Drawer>
  );
}
