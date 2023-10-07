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
import { OvertimeType, createOvertime } from "../../api/overtime";
import Select from "../commons/Select";
import { getSelectData } from "../../utils/functions/getSelectData";

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
  quantity: 0,
};

export default function CreateOvertime({ opened, close }: Props) {
  const { isSuperAdmin, user } = useAppContext();

  const [companyId, setCompanyId] = useState<string>();
  const [employeeId, setEmployeeId] = useState<string>();
  const [overtimeType, setOvertimeType] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [values, setValues] = useState(initialValues);

  const currentCompanyId = user?.user_metadata?.company_id;

  const setInitialValues = () => {
    setValues(initialValues);
    setCompanyId(undefined);
    setEmployeeId(undefined);
    setDate(undefined);
    setOvertimeType(undefined);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleClose = () => {
    setInitialValues();
    close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employeeId || !date) return;

    const isConfirmed = await confirmationModal({
      title: "Agregar",
      message: "¿Estás seguro de que deseas agregar este tiempo extra?",
    });

    if (!isConfirmed) return;

    const { quantity } = values;

    if (!overtimeType) return;

    if (!quantity || quantity < 1) {
      return showCustomNotification("warning", {
        title: "Cantidad de horas extras",
        message: "Ingrese una cantidad válida.",
      });
    }

    await createOvertime({
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      employeeId,
      type: overtimeType as OvertimeType,
      date,
      quantity,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Overtime] });

    showCustomNotification("success", {
      title: "Agregar",
      message: "Tiempo extra agregado correctamente.",
    });

    setInitialValues();
    close();
  };

  const showEmployeeSelect = () => {
    return (isSuperAdmin && companyId) || (!isSuperAdmin && currentCompanyId);
  };

  const overtimeTypeArray = getSelectData<{
    label: string;
    value: OvertimeType;
  }>({
    array: [
      { label: "Simple", value: "SIMPLE" },
      { label: "Doble", value: "DOUBLE" },
    ],
    label: "label",
    value: "value",
  });

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Crear registro de tiempo extra</Title>

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

        <Select
          data={overtimeTypeArray}
          label="Tipo de hora extra"
          onChange={setOvertimeType}
          placeholder="Seleccione un tipo de hora extra"
          required
        />

        <Input
          label="Cantidad"
          name="quantity"
          onChange={handleChange}
          placeholder="Cantidad"
          required
          value={values.quantity}
          type="number"
        />

        <DatePickerInput
          clearable
          label="Fecha"
          name="date"
          onChange={handleDateChange}
          required
          value={date}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaCirclePlus />} type="submit">
          Crear
        </Button>
      </StyledForm>
    </Drawer>
  );
}
