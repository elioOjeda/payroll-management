import styled from "styled-components";
import { CellContext } from "@tanstack/react-table";
import { useDisclosure } from "@mantine/hooks";
import { FaPencil } from "react-icons/fa6";
import Button from "../../../commons/Button";
import { Department } from "../../../../api/department";
import UpdateDepartment from "../../UpdateDepartment";

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionsCell = ({ row }: CellContext<Department, unknown>) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <ActionsContainer>
      <UpdateDepartment
        department={row.original}
        opened={opened}
        close={close}
      />

      <Button leftIcon={<FaPencil />} onClick={open} variant="subtle">
        Actualizar
      </Button>
    </ActionsContainer>
  );
};
