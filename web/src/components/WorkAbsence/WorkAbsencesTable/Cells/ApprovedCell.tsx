import { CellContext } from "@tanstack/react-table";
import { WorkAbsence, updateWorkAbsence } from "../../../../api/workAbsence";
import Checkbox from "../../../commons/Checkbox";
import styled from "styled-components";
import { confirmationModal } from "../../../../utils/functions/confirmationModal";
import { showCustomNotification } from "../../../../utils/functions/showCustomNotification";
import { queryClient } from "../../../../api/supabase";
import { QueryKey } from "../../../../utils/constants";
import useAppContext from "../../../../hooks/useAppContext";
import { isBefore } from "date-fns";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ApprovedCell = ({ row }: CellContext<WorkAbsence, unknown>) => {
  const { id, is_approved } = row.original;
  const { isSuperAdmin, isAdmin } = useAppContext();

  const handleChange = async () => {
    const title = is_approved ? "Rechazar solicitud" : "Aprobar solicitud";
    const message = is_approved
      ? "¿Estás seguro de que deseas rechazar esta solicitud de ausencia laboral?"
      : "¿Estás seguro de que deseas aprobar esta solicitud de ausencia laboral?";

    const alertTitle = is_approved ? "Rechazar" : "Aprobar";
    const alertMessage = is_approved
      ? "Solicitud de ausencia laboral rechazada correctamente."
      : "Solicitud de ausencia laboral aprobada correctamente.";

    const isConfirmed = await confirmationModal({
      title,
      message,
    });

    if (!isConfirmed) return;

    await updateWorkAbsence({
      workAbsenceId: id,
      isApproved: !is_approved,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.WorkAbsences] });

    showCustomNotification("success", {
      title: alertTitle,
      message: alertMessage,
    });
  };

  const isDisabled =
    (!isSuperAdmin && !isAdmin) ||
    isBefore(
      new Date(row.original.absence_date.replace(/-/g, "/")),
      new Date()
    );

  return (
    <Container>
      <Checkbox
        checked={row.original.is_approved}
        onChange={handleChange}
        disabled={isDisabled}
      />
    </Container>
  );
};
