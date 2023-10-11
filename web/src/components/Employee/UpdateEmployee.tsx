import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styled from "styled-components";
import Drawer from "../commons/Drawer";
import { Divider, Title } from "@mantine/core";
import { confirmationModal } from "../../utils/functions/confirmationModal";
import { Employee, updateEmployee } from "../../api/employee";
import { QueryKey } from "../../utils/constants";
import { showCustomNotification } from "../../utils/functions/showCustomNotification";
import { queryClient } from "../../api/supabase";
import Input from "../commons/Input";
import DatePickerInput from "../commons/DatePickerInput";
import Button from "../commons/Button";
import { FaPencil } from "react-icons/fa6";
import FileInput from "../commons/FileInput";
import { uploadFile } from "../../api/storage/uploadFile";
import { getPublicUrl } from "../../api/storage/getPublicUrl";

type Props = {
  employee: Employee;
  opened: boolean;
  close: () => void;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export default function UpdateEmployee({ employee, opened, close }: Props) {
  const initialValues = {
    firstName: employee.first_name,
    lastName: employee.last_name,
    address: employee.address,
    email: employee.email,
    phone: employee.phone,
  };

  const setInitialBirthDate = useCallback(() => {
    return employee.birth_date ? new Date(employee.birth_date) : undefined;
  }, [employee.birth_date]);

  const [birthDate, setBirthDate] = useState<Date | undefined>(
    setInitialBirthDate()
  );
  const [hireDate, setHireDate] = useState<Date>(new Date(employee.hire_date));
  const [image, setImage] = useState<File | null>(null);
  const [values, setValues] = useState(initialValues);

  const setInitialValues = () => {
    setValues(initialValues);
    setBirthDate(setInitialBirthDate());
    setHireDate(new Date(employee.hire_date));
    setImage(null);
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

    if (!hireDate) return;

    const { id: employeeId } = employee;

    const isConfirmed = await confirmationModal({
      title: "Actualizar",
      message: "¿Estás seguro de que deseas actualizar este empleado?",
    });

    if (!isConfirmed) return;

    const requestFilePath = await uploadFile({
      id: employeeId,
      bucketName: "employee-files",
      folder: "images",
      file: image,
    });

    const photoUrl = getPublicUrl({
      bucketName: "employee-files",
      filePath: requestFilePath,
    });

    const { firstName, lastName, address, email, phone } = values;

    await updateEmployee({
      employeeId,
      firstName,
      lastName,
      birthDate,
      address,
      phone,
      email,
      hireDate,
      photoUrl,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Employees] });
    queryClient.invalidateQueries({ queryKey: [QueryKey.Employee] });

    showCustomNotification("success", {
      title: "Actualizar",
      message: "Empleado actualizado correctamente.",
    });

    setImage(null);
    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Actualizar empleado</Title>

        <Divider my="xs" label="Información personal" labelPosition="center" />

        <FileInput
          accept="image/png,image/jpeg,image/jpg"
          label="Fotografía"
          name="imageUrl"
          onChange={setImage}
          placeholder="Subir archivo"
          required
          value={image}
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
          value={values.address ?? ""}
        />

        <Input
          label="Correo electrónico"
          name="email"
          onChange={handleChange}
          placeholder="Correo electrónico"
          type="email"
          value={values.email ?? ""}
        />

        <Input
          label="Número de teléfono"
          maxLength={8}
          name="phone"
          onChange={handleChange}
          placeholder="Número de teléfono"
          value={values.phone ?? ""}
        />

        <Divider
          my="xs"
          label="Información de contratación"
          labelPosition="center"
        />

        <DatePickerInput
          clearable
          label="Fecha de contratación"
          name="hireDate"
          onChange={handleHireDateChange}
          required
          value={hireDate}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaPencil />} type="submit">
          Actualizar
        </Button>
      </StyledForm>
    </Drawer>
  );
}