import styled from "styled-components";
import { Company } from "../../../../api/company";
import { CellContext } from "@tanstack/react-table";
import { useDisclosure } from "@mantine/hooks";
import UpdateCompany from "../../UpdateCompany";
import { FaPencil } from "react-icons/fa6";
import Button from "../../../commons/Button";

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionsCell = ({ row }: CellContext<Company, unknown>) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <ActionsContainer>
      <UpdateCompany company={row.original} opened={opened} close={close} />

      <Button leftIcon={<FaPencil />} onClick={open} variant="subtle">
        Actualizar
      </Button>
    </ActionsContainer>
  );
};
