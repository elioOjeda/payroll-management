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
import { FaCirclePlus } from "react-icons/fa6";
import { createCompany } from "../../api/company";

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
  name: "",
};

export default function CreateCompany({ opened, close }: Props) {
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

    const isConfirmed = await confirmationModal({
      title: "Crear",
      message: "¿Estás seguro de que deseas crear esta empresa?",
    });

    if (!isConfirmed) return;

    const { name } = values;

    await createCompany({
      name,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Companies] });

    showCustomNotification("success", {
      title: "Crear",
      message: "Empresa creada correctamente.",
    });

    setInitialValues();
    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Crear empresa</Title>

        <Divider my="xs" />

        <Input
          label="Nombre"
          name="name"
          onChange={handleChange}
          placeholder="Nombre"
          required
          value={values.name}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaCirclePlus />} type="submit">
          Crear
        </Button>
      </StyledForm>
    </Drawer>
  );
}
