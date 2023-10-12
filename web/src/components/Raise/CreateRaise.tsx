import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Drawer from "../commons/Drawer";
import { Divider, Title } from "@mantine/core";
import CompanySelect from "../CompanySelect";
import useAppContext from "../../hooks/useAppContext";
import { confirmationModal } from "../../utils/functions/confirmationModal";
import { QueryKey } from "../../utils/constants";
import { showCustomNotification } from "../../utils/functions/showCustomNotification";
import { queryClient } from "../../api/supabase";
import Input from "../commons/Input";
import Button from "../commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import DatePickerInput from "../commons/DatePickerInput";
import EmployeeSelect from "../EmployeeSelect";
import { createRaise } from "../../api/raise";

type Props = {
  opened: boolean;
  close: () => void;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const initialValues = {
  raiseAmount: 0,
  description: "",
};

export default function CreateRaise({ opened, close }: Props) {
  const { isSuperAdmin, user } = useAppContext();

  const [companyId, setCompanyId] = useState<string>();
  const [employeeId, setEmployeeId] = useState<string>();
  const [raiseDate, setRaiseDate] = useState<Date>();
  const [values, setValues] = useState(initialValues);

  const currentCompanyId = user?.user_metadata?.company_id;

  const setInitialValues = () => {
    setValues(initialValues);
    setCompanyId(undefined);
    setEmployeeId(undefined);
    setRaiseDate(undefined);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRaiseDateChange = (date: Date) => {
    setRaiseDate(date);
  };

  const handleClose = () => {
    setInitialValues();
    close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employeeId) return;

    const { raiseAmount, description } = values;

    if (!raiseAmount || raiseAmount < 1) {
      return showCustomNotification("warning", {
        title: "Cantidad no válida",
        message: "Ingrese una cantidad a aumentar válida.",
      });
    }

    if (!raiseDate) {
      return showCustomNotification("warning", {
        title: "Cantidad no válida",
        message: "Ingrese una cantidad a aumentar válida.",
      });
    }

    const isConfirmed = await confirmationModal({
      title: "Agregar",
      message: "¿Estás seguro de que deseas agregar este aumento?",
    });

    if (!isConfirmed) return;

    await createRaise({
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      employeeId,
      raiseAmount,
      raiseDate,
      description,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Employee] });
    queryClient.invalidateQueries({ queryKey: [QueryKey.Raises] });

    showCustomNotification("success", {
      title: "Agregar",
      message: "Aumento agregado correctamente.",
    });

    setInitialValues();
    close();
  };

  const showEmployeeSelect = () => {
    return (isSuperAdmin && companyId) || (!isSuperAdmin && currentCompanyId);
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Agregar aumento</Title>

        <Divider my="xs" />

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

        {showEmployeeSelect() && (
          <EmployeeSelect
            companyId={isSuperAdmin ? companyId : currentCompanyId}
            label="Empleado"
            onChange={setEmployeeId}
            placeholder="Seleccione un empleado"
            required
            value={employeeId}
          />
        )}

        <Input
          label="Cantidad a aumentar (GTQ)"
          name="raiseAmount"
          onChange={handleChange}
          placeholder="Cantidad a aumentar (GTQ)"
          required
          value={values.raiseAmount}
          type="number"
        />

        <DatePickerInput
          clearable
          label="Fecha de aumento"
          name="date"
          onChange={handleRaiseDateChange}
          required
          value={raiseDate}
        />

        <Input
          label="Descripción"
          name="description"
          onChange={handleChange}
          placeholder="Descripción"
          value={values.description}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaCirclePlus />} type="submit">
          Crear
        </Button>
      </StyledForm>
    </Drawer>
  );
}
