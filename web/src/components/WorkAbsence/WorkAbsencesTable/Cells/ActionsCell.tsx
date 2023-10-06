import styled from "styled-components";
import Button from "../../../commons/Button";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { CellContext } from "@tanstack/react-table";
import { confirmationModal } from "../../../../utils/functions/confirmationModal";
import { queryClient } from "../../../../api/supabase";
import { QueryKey } from "../../../../utils/constants";
import { showCustomNotification } from "../../../../utils/functions/showCustomNotification";
import { useDisclosure } from "@mantine/hooks";
import { WorkAbsence, updateWorkAbsence } from "../../../../api/workAbsence";
import UpdateWorkAbsence from "../../UpdateWorkAbsence";

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionsCell = ({ row }: CellContext<WorkAbsence, unknown>) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { id: workAbsenceId, is_approved: isApproved } = row.original;

  const handleDelete = async () => {
    const isConfirmed = await confirmationModal({
      title: "Eliminar",
      message:
        "¿Estás seguro de que deseas eliminar esta solicitud de ausencia laboral?",
    });

    if (!isConfirmed) return;

    await updateWorkAbsence({
      workAbsenceId,
      isDisabled: true,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.WorkAbsences] });

    showCustomNotification("success", {
      title: "Eliminar",
      message: "Solicitud de ausencia laboral eliminada correctamente.",
    });
  };

  return (
    <ActionsContainer>
      <UpdateWorkAbsence
        workAbsence={row.original}
        opened={opened}
        close={close}
      />

      {!isApproved && (
        <Button leftIcon={<FaPencil />} onClick={open} variant="subtle">
          Actualizar
        </Button>
      )}

      <Button
        color="red"
        leftIcon={<FaTrash />}
        onClick={handleDelete}
        variant="subtle"
      >
        Eliminar
      </Button>
    </ActionsContainer>
  );
};
