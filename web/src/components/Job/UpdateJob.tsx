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
import { Job, updateJob } from "../../api/job";
import DeparmentSelect from "../DeparmentSelect";

type Props = {
  job: Job;
  opened: boolean;
  close: () => void;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export default function UpdateJob({ job, opened, close }: Props) {
  const initialValues = {
    title: job.title,
    description: job.description,
    baseSalary: job.base_salary,
  };

  const [departmentId, setDepartmentId] = useState<string>(job.department_id);
  const [values, setValues] = useState(initialValues);

  const setInitialValues = () => {
    setDepartmentId(job.department_id);
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

    if (!departmentId) return;

    const { id: jobId } = job;

    const isConfirmed = await confirmationModal({
      title: "Actualizar",
      message: "¿Estás seguro de que deseas actualizar este puesto laboral?",
    });

    if (!isConfirmed) return;

    const { title, description, baseSalary } = values;

    await updateJob({
      jobId,
      departmentId,
      title,
      description,
      baseSalary,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Jobs] });

    showCustomNotification("success", {
      title: "Actualizar",
      message: "Puesto laboral actualizado correctamente.",
    });

    close();
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Actualizar puesto laboral</Title>

        <Divider my="xs" />

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
          value={values.description ?? ""}
        />

        <Input
          label="Salario base"
          name="baseSalary"
          onChange={handleChange}
          placeholder="Salario base"
          value={values.baseSalary ?? ""}
          type="number"
        />

        <DeparmentSelect
          companyId={job.company_id}
          label="Departamento"
          onChange={setDepartmentId}
          placeholder="Seleccione un departamento"
          value={departmentId}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaPencil />} type="submit">
          Actualizar
        </Button>
      </StyledForm>
    </Drawer>
  );
}
