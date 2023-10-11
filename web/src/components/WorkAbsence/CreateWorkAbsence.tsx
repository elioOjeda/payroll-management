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
import { createWorkAbsence } from "../../api/workAbsence";
import DatePickerInput from "../commons/DatePickerInput";
import EmployeeSelect from "../EmployeeSelect";
import FileInput from "../commons/FileInput";
import { uploadFile } from "../../api/storage/uploadFile";
import { getPublicUrl } from "../../api/storage/getPublicUrl";

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
  type: "",
};

export default function CreateWorkAbsence({ opened, close }: Props) {
  const { isSuperAdmin, user } = useAppContext();

  const [companyId, setCompanyId] = useState<string>();
  const [employeeId, setEmployeeId] = useState<string>();
  const [absenceDate, setAbsenceDate] = useState<Date>();
  const [requestFile, setRequestFile] = useState<File | null>(null);
  const [values, setValues] = useState(initialValues);

  const currentCompanyId = user?.user_metadata?.company_id;

  const setInitialValues = () => {
    setValues(initialValues);
    setCompanyId(undefined);
    setEmployeeId(undefined);
    setAbsenceDate(undefined);
    setRequestFile(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAbsenceDateChange = (date: Date) => {
    setAbsenceDate(date);
  };

  const handleClose = () => {
    setInitialValues();
    close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employeeId || !absenceDate || !requestFile) return;

    const isConfirmed = await confirmationModal({
      title: "Crear",
      message:
        "¿Estás seguro de que deseas crear esta solicitud de ausencia laboral?",
    });

    if (!isConfirmed) return;

    const requestFilePath = await uploadFile({
      id: employeeId,
      bucketName: "employee-files",
      folder: "documents",
      file: requestFile,
    });

    const requestFileUrl = getPublicUrl({
      bucketName: "employee-files",
      filePath: requestFilePath,
    });

    const { type } = values;

    await createWorkAbsence({
      companyId: isSuperAdmin ? companyId : currentCompanyId,
      employeeId,
      type,
      absenceDate,
      requestUrl: requestFileUrl,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.WorkAbsences] });

    showCustomNotification("success", {
      title: "Crear",
      message: "Solicitud de ausencia laboral creada correctamente.",
    });

    setInitialValues();
    close();
  };

  const showEmployeeSelect = () => {
    return (isSuperAdmin && companyId) || (!isSuperAdmin && currentCompanyId);
  };

  return (
    <Drawer close={handleClose} opened={opened}>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Crear solicitud de ausencia laboral</Title>

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

        <Input
          label="Tipo de ausencia"
          name="type"
          onChange={handleChange}
          placeholder="Tipo de ausencia"
          required
          value={values.type}
        />

        <DatePickerInput
          clearable
          label="Fecha de ausencia"
          name="ausenceDate"
          onChange={handleAbsenceDateChange}
          required
          value={absenceDate}
        />

        <FileInput
          accept=".pdf"
          label="Solicitud"
          name="requestFile"
          onChange={setRequestFile}
          placeholder="Subir archivo"
          required
          value={requestFile}
        />

        <Divider my="xs" />

        <Button color="blue" leftIcon={<FaCirclePlus />} type="submit">
          Crear
        </Button>
      </StyledForm>
    </Drawer>
  );
}
