import styled from "styled-components";
import Button from "../../../commons/Button";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { CellContext } from "@tanstack/react-table";
import { confirmationModal } from "../../../../utils/functions/confirmationModal";
import { queryClient } from "../../../../api/supabase";
import { QueryKey } from "../../../../utils/constants";
import { showCustomNotification } from "../../../../utils/functions/showCustomNotification";
import { useDisclosure } from "@mantine/hooks";
import { User, updateUser } from "../../../../api/users";
import UpdateUser from "../../UpdateUser";

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionsCell = ({ row }: CellContext<User, unknown>) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { id: userId } = row.original;

  const handleDelete = async () => {
    const isConfirmed = await confirmationModal({
      title: "Eliminar",
      message: "¿Estás seguro de que deseas eliminar este usuario?",
    });

    if (!isConfirmed) return;

    await updateUser({
      userId,
      isDisabled: true,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Users] });

    showCustomNotification("success", {
      title: "Eliminar",
      message: "Usuario eliminado correctamente.",
    });
  };

  return (
    <ActionsContainer>
      <UpdateUser user={row.original} opened={opened} close={close} />

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
