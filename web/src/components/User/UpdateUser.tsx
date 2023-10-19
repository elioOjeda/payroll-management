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
import { User, updateUser } from "../../api/users";
import Checkbox from "../commons/Checkbox";
import useAppContext from "../../hooks/useAppContext";

type Props = {
  user: User;
  opened: boolean;
  close: () => void;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export default function UpdateUser({ user, opened, close }: Props) {
  const initialValues = {
    firstName: user.first_name,
    lastName: user.last_name,
    isAdmin: user.is_admin,
  };

  const { setIsAdmin, user: adminUser } = useAppContext();

  const [values, setValues] = useState(initialValues);

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

    const { id: userId } = user;

    const isConfirmed = await confirmationModal({
      title: "Actualizar",
      message: "¿Estás seguro de que deseas actualizar este usuario?",
    });

    if (!isConfirmed) return;

    const { firstName, lastName, isAdmin } = values;

    await updateUser({
      userId,
      firstName,
      lastName,
      isAdmin,
    });

    if (setIsAdmin && adminUser?.id === userId) {
      setIsAdmin(isAdmin);
    }

    queryClient.invalidateQueries({ queryKey: [QueryKey.Users] });

    showCustomNotification("success", {
      title: "Actualizar",
      message: "Usuario actualizado correctamente.",
    });

    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Actualizar usuario</Title>

        <Divider my="xs" />

        <Input
          label="Nombre"
          name="firstName"
          onChange={handleChange}
          placeholder="Nombre"
          required
          value={values.firstName ?? ""}
        />

        <Input
          label="Apellido"
          name="lastName"
          onChange={handleChange}
          placeholder="Apellido"
          required
          value={values.lastName ?? ""}
        />

        <Checkbox
          label="Administrador"
          name="isAdmin"
          checked={values.isAdmin}
          onChange={handleCheck}
          disabled={adminUser?.id === user.id}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaPencil />} type="submit">
          Actualizar
        </Button>
      </StyledForm>
    </Drawer>
  );
}
