import styled from "styled-components";
import Button from "../../../commons/Button";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { CellContext } from "@tanstack/react-table";
import { confirmationModal } from "../../../../utils/functions/confirmationModal";
import { queryClient } from "../../../../api/supabase";
import { QueryKey } from "../../../../utils/constants";
import { showCustomNotification } from "../../../../utils/functions/showCustomNotification";
import { useDisclosure } from "@mantine/hooks";
import { Job, updateJob } from "../../../../api/job";
import UpdateJob from "../../UpdateJob";

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionsCell = ({ row }: CellContext<Job, unknown>) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { id: jobId } = row.original;

  const handleDelete = async () => {
    const isConfirmed = await confirmationModal({
      title: "Eliminar",
      message: "¿Estás seguro de que deseas eliminar este puesto laboral?",
    });

    if (!isConfirmed) return;

    await updateJob({
      jobId,
      isDisabled: true,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Jobs] });

    showCustomNotification("success", {
      title: "Eliminar",
      message: "Puesto laboral eliminado correctamente.",
    });
  };

  return (
    <ActionsContainer>
      <UpdateJob job={row.original} opened={opened} close={close} />

      <Button leftIcon={<FaPencil />} onClick={open} variant="subtle">
        Actualizar
      </Button>

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
