import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Drawer from "../commons/Drawer";
import { Divider, Title } from "@mantine/core";
import CompanySelect from "../CompanySelect";
import useAppContext from "../../hooks/useAppContext";
import { confirmationModal } from "../../utils/functions/confirmationModal";
import { createEmployee } from "../../api/employee";
import { QueryKey } from "../../utils/constants";
import { showCustomNotification } from "../../utils/functions/showCustomNotification";
import { queryClient } from "../../api/supabase";
import Input from "../commons/Input";
import DatePickerInput from "../commons/DatePickerInput";
import Button from "../commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import JobSelect from "../JobSelect";
import DeparmentSelect from "../DeparmentSelect";
import { createEmployeeJob } from "../../api/employeeJob";

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
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "",
};

export default function CreateEmployee({ opened, close }: Props) {
  const { isSuperAdmin, user } = useAppContext();

  const [companyId, setCompanyId] = useState<string>();
  const [birthDate, setBirthDate] = useState<Date>();
  const [hireDate, setHireDate] = useState<Date>();
  const [values, setValues] = useState(initialValues);

  const [departmentId, setDepartmentId] = useState<string>();
  const [jobId, setJobId] = useState<string>();

  const currentCompanyId = user?.user_metadata?.company_id;

  const setInitialValues = () => {
    setValues(initialValues);
    setCompanyId(undefined);
    setBirthDate(undefined);
    setHireDate(undefined);
    setDepartmentId(undefined);
    setJobId(undefined);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBirthDateChange = (date: Date) => {
    setBirthDate(date);
  };

  const handleHireDateChange = (date: Date) => {
    setHireDate(date);
  };

  const handleClose = () => {
    setInitialValues();
    close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hireDate || !jobId) return;

    const isConfirmed = await confirmationModal({
      title: "Crear",
      message: "¿Estás seguro de que deseas crear este empleado?",
    });

    if (!isConfirmed) return;

    const { firstName, lastName, address, email, phone } = values;

    const { id: employeeId } = await createEmployee({
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      firstName,
      lastName,
      birthDate,
      address,
      phone,
      email,
      hireDate,
    });

    await createEmployeeJob({
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      employeeId,
      jobId,
      startDate: hireDate,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Employees] });

    showCustomNotification("success", {
      title: "Crear",
      message: "Empleado creado correctamente.",
    });

    setInitialValues();
    close();
  };

  const showJobSection = () => {
    return (isSuperAdmin && companyId) || (!isSuperAdmin && currentCompanyId);
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Crear empleado</Title>

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

        <Divider
          my="xs"
          label="Información del empleado"
          labelPosition="center"
        />

        <Input
          label="Nombres"
          name="firstName"
          onChange={handleChange}
          placeholder="Nombres"
          required
          value={values.firstName}
        />

        <Input
          label="Apellidos"
          name="lastName"
          onChange={handleChange}
          placeholder="Apellidos"
          required
          value={values.lastName}
        />

        <DatePickerInput
          clearable
          label="Fecha de nacimiento"
          name="birthDate"
          onChange={handleBirthDateChange}
          value={birthDate}
        />

        <Input
          label="Dirección"
          name="address"
          onChange={handleChange}
          placeholder="Dirección"
          value={values.address}
        />

        <Input
          label="Correo electrónico"
          name="email"
          onChange={handleChange}
          placeholder="Correo electrónico"
          type="email"
          value={values.email}
        />

        <Input
          label="Número de teléfono"
          maxLength={8}
          name="phone"
          onChange={handleChange}
          placeholder="Número de teléfono"
          value={values.phone}
        />

        <DatePickerInput
          clearable
          label="Fecha de contratación"
          name="hireDate"
          onChange={handleHireDateChange}
          required
          value={hireDate}
        />

        {showJobSection() && (
          <>
            <Divider
              my="xs"
              label="Información de contratación"
              labelPosition="center"
            />

            <DeparmentSelect
              companyId={isSuperAdmin ? companyId : currentCompanyId}
              label="Departamento"
              onChange={setDepartmentId}
              placeholder="Seleccione un departamento"
              value={departmentId}
            />

            <JobSelect
              companyId={isSuperAdmin ? companyId : currentCompanyId}
              departmentId={departmentId}
              label="Puesto"
              onChange={setJobId}
              placeholder="Seleccione un puesto"
              required
              value={jobId}
            />
          </>
        )}

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaCirclePlus />} type="submit">
          Crear
        </Button>
      </StyledForm>
    </Drawer>
  );
}
