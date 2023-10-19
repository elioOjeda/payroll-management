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
import { createUser } from "../../api/edgeFunctions/createUser";
import useAppContext from "../../hooks/useAppContext";
import CompanySelect from "../CompanySelect";
import PasswordInput from "../commons/PasswordInput";
import Checkbox from "../commons/Checkbox";

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
  email: "",
  password: "",
  isAdmin: false,
};

export default function CreateUser({ opened, close }: Props) {
  const { isSuperAdmin, user } = useAppContext();

  const [companyId, setCompanyId] = useState<string>();
  const [values, setValues] = useState(initialValues);

  const currentCompanyId = user?.user_metadata?.company_id;

  const setInitialValues = () => {
    setValues(initialValues);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.currentTarget.checked });
  };

  const handleClose = () => {
    setInitialValues();
    close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = await confirmationModal({
      title: "Crear",
      message: "¿Estás seguro de que deseas crear este usuario?",
    });

    if (!isConfirmed) return;

    const { email, password, isAdmin } = values;

    await createUser({
      email,
      password,
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      isAdmin,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Users] });

    showCustomNotification("success", {
      title: "Crear",
      message: "Usuario creado correctamente.",
    });

    setInitialValues();
    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Crear usuario</Title>

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

        <Input
          label="Correo electrónico"
          name="email"
          onChange={handleChange}
          placeholder="Correo electrónico"
          type="email"
          value={values.email}
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          onChange={handleChange}
          placeholder="Contraseña"
          required
          value={values.password}
        />

        <Checkbox
          label="Administrador"
          name="isAdmin"
          checked={values.isAdmin}
          onChange={handleCheck}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaCirclePlus />} type="submit">
          Crear
        </Button>
      </StyledForm>
    </Drawer>
  );
}
