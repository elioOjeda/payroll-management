import { CellContext } from "@tanstack/react-table";
import Checkbox from "../../../commons/Checkbox";
import styled from "styled-components";
import { User } from "../../../../api/users";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const AdminCell = ({ row }: CellContext<User, unknown>) => {
  return (
    <Container>
      <Checkbox checked={row.original.is_admin} disabled={true} />
    </Container>
  );
};
