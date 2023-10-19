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
import { Company, updateCompany } from "../../api/company";

type Props = {
  company: Company;
  opened: boolean;
  close: () => void;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export default function UpdateCompany({ company, opened, close }: Props) {
  const initialValues = {
    name: company.name,
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

    const { id: companyId } = company;

    const isConfirmed = await confirmationModal({
      title: "Actualizar",
      message: "¿Estás seguro de que deseas actualizar esta empresa?",
    });

    if (!isConfirmed) return;

    const { name } = values;

    await updateCompany({
      companyId,
      name,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Companies] });

    showCustomNotification("success", {
      title: "Actualizar",
      message: "Empresa actualizada correctamente.",
    });

    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Actualizar empresa</Title>

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

        <Button color="blue" leftIcon={<FaPencil />} type="submit">
          Actualizar
        </Button>
      </StyledForm>
    </Drawer>
  );
}
