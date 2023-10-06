import styled from "styled-components";
import Button from "../../../commons/Button";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { CellContext } from "@tanstack/react-table";
import { Employee, updateEmployee } from "../../../../api/employee";
import { confirmationModal } from "../../../../utils/functions/confirmationModal";
import { queryClient } from "../../../../api/supabase";
import { QueryKey } from "../../../../utils/constants";
import { showCustomNotification } from "../../../../utils/functions/showCustomNotification";
import UpdateEmployee from "../../UpdateEmployee";
import { useDisclosure } from "@mantine/hooks";

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionsCell = ({ row }: CellContext<Employee, unknown>) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { id: employeeId } = row.original;

  const handleDelete = async () => {
    const isConfirmed = await confirmationModal({
      title: "Eliminar",
      message: "¿Estás seguro de que deseas eliminar este empleado?",
    });

    if (!isConfirmed) return;

    await updateEmployee({
      employeeId,
      isDisabled: true,
    });

    queryClient.invalidateQueries({ queryKey: [QueryKey.Employees] });

    showCustomNotification("success", {
      title: "Eliminar",
      message: "Empleado eliminado correctamente.",
    });
  };

  return (
    <ActionsContainer>
      <UpdateEmployee employee={row.original} opened={opened} close={close} />

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
