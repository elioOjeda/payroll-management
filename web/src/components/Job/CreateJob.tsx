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
import DeparmentSelect from "../DeparmentSelect";
import { createJob } from "../../api/job";

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

const initialValues: {
  title: string;
  description: string;
  baseSalary: number | null;
} = {
  title: "",
  description: "",
  baseSalary: null,
};

export default function CreateJob({ opened, close }: Props) {
  const { isSuperAdmin, user } = useAppContext();

  const [companyId, setCompanyId] = useState<string>();
  const [departmentId, setDepartmentId] = useState<string>();
  const [values, setValues] = useState(initialValues);

  const currentCompanyId = user?.user_metadata?.company_id;

  const setInitialValues = () => {
    setValues(initialValues);
    setCompanyId(undefined);
    setDepartmentId(undefined);
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

    if (!departmentId) return;

    if (!values.baseSalary) {
      return showCustomNotification("warning", {
        title: "Salario base no válido",
        message: "Ingrese un salario base válido.",
      });
    }

    const isConfirmed = await confirmationModal({
      title: "Crear",
      message: "¿Estás seguro de que deseas crear este puesto laboral?",
    });

    if (!isConfirmed) return;

    const { title, description, baseSalary } = values;

    await createJob({
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      departmentId,
      title,
      description,
      baseSalary,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Jobs] });

    showCustomNotification("success", {
      title: "Crear",
      message: "Puesto laboral creado correctamente.",
    });

    setInitialValues();
    close();
  };

  const showDeparmentSelect = () => {
    return (isSuperAdmin && companyId) || (!isSuperAdmin && currentCompanyId);
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Crear puesto laboral</Title>

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
          label="Puesto"
          name="title"
          onChange={handleChange}
          placeholder="Puesto"
          required
          value={values.title}
        />

        <Input
          label="Descripción"
          name="description"
          onChange={handleChange}
          placeholder="Descripción"
          value={values.description}
        />

        <Input
          label="Salario base"
          name="baseSalary"
          onChange={handleChange}
          placeholder="Salario base"
          required
          value={values.baseSalary ?? ""}
          type="number"
        />

        {showDeparmentSelect() && (
          <DeparmentSelect
            companyId={isSuperAdmin ? companyId : currentCompanyId}
            label="Departamento"
            onChange={setDepartmentId}
            placeholder="Seleccione un departamento"
            required
            value={departmentId}
          />
        )}

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaCirclePlus />} type="submit">
          Crear
        </Button>
      </StyledForm>
    </Drawer>
  );
}
