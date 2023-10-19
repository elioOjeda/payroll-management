import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Drawer from "../commons/Drawer";
import { Divider, Title } from "@mantine/core";
import { confirmationModal } from "../../utils/functions/confirmationModal";
import { QueryKey } from "../../utils/constants";
import { showCustomNotification } from "../../utils/functions/showCustomNotification";
import { queryClient } from "../../api/supabase";
import Input from "../commons/Input";
import Button from "../commons/Button";
import { FaPencil } from "react-icons/fa6";
import { Department, updateDepartment } from "../../api/department";

type Props = {
  department: Department;
  opened: boolean;
  close: () => void;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export default function UpdateDepartment({ department, opened, close }: Props) {
  const initialValues = {
    name: department.name,
    description: department.description,
  };

  const [values, setValues] = useState(initialValues);

  const setInitialValues = () => {
    setValues(initialValues);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setInitialValues();
    close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id: departmentId } = department;

    const isConfirmed = await confirmationModal({
      title: "Actualizar",
      message: "¿Estás seguro de que deseas actualizar este departamento?",
    });

    if (!isConfirmed) return;

    const { name, description } = values;

    await updateDepartment({
      departmentId,
      name,
      description,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Deparments] });

    showCustomNotification("success", {
      title: "Actualizar",
      message: "Departamento actualizado correctamente.",
    });

    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Actualizar departamento</Title>

        <Divider my="xs" />

        <Input
          label="Nombre"
          name="name"
          onChange={handleChange}
          placeholder="Nombre"
          required
          value={values.name}
        />

        <Input
          label="Descripción"
          name="description"
          onChange={handleChange}
          placeholder="Descripción"
          required
          value={values.description ?? ""}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaPencil />} type="submit">
          Actualizar
        </Button>
      </StyledForm>
    </Drawer>
  );
}
