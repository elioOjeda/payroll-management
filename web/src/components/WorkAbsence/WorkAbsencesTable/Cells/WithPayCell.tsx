import { CellContext } from "@tanstack/react-table";
import { WorkAbsence, updateWorkAbsence } from "../../../../api/workAbsence";
import Checkbox from "../../../commons/Checkbox";
import styled from "styled-components";
import { showCustomNotification } from "../../../../utils/functions/showCustomNotification";
import { QueryKey } from "../../../../utils/constants";
import { queryClient } from "../../../../api/supabase";
import { confirmationModal } from "../../../../utils/functions/confirmationModal";
import useAppContext from "../../../../hooks/useAppContext";
import { isBefore } from "date-fns";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const WithPayCell = ({ row }: CellContext<WorkAbsence, unknown>) => {
  const { id, is_with_pay } = row.original;
  const { isSuperAdmin, isAdmin } = useAppContext();

  const handleChange = async () => {
    const title = is_with_pay ? "Sin goce de sueldo" : "Con goce de sueldo";
    const message = is_with_pay
      ? "¿Estás seguro de que deseas establecer que esta será una ausencia laboral sin goce de sueldo?"
      : "¿Estás seguro de que deseas establecer que esta será una ausencia laboral con goce de sueldo?";

    const alertTitle = is_with_pay
      ? "Sin goce de sueldo"
      : "Con goce de sueldo";
    const alertMessage = is_with_pay
      ? "La solicitud de ausencia se ha establecido como: sin goce de sueldo."
      : "La solicitud de ausencia se ha establecido como: con goce de sueldo.";

    const isConfirmed = await confirmationModal({
      title,
      message,
    });

    if (!isConfirmed) return;

    await updateWorkAbsence({
      workAbsenceId: id,
      isWithPay: !is_with_pay,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.WorkAbsences] });

    showCustomNotification("success", {
      title: alertTitle,
      message: alertMessage,
    });
  };

  const isDisabled =
    (!isSuperAdmin && !isAdmin) ||
    isBefore(new Date(row.original.absence_date), new Date());

  return (
    <Container>
      <Checkbox
        checked={row.original.is_with_pay}
        disabled={isDisabled}
        onChange={handleChange}
      />
    </Container>
  );
};
