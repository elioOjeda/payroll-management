import styled from "styled-components";
import Button from "../components/commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { Title } from "@mantine/core";
import CreateUser from "../components/User/CreateUser";
import UsersTable from "../components/User/UserTable.tsx/UsersTable";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export default function UsersPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <InnerContainer>
        <Title>Usuarios</Title>

        <CreateUser opened={opened} close={close} />

        <Button color="blue" leftIcon={<FaCirclePlus />} onClick={open}>
          Crear
        </Button>
      </InnerContainer>

      <UsersTable />
    </Container>
  );
}
