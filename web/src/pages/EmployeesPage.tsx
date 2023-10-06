import styled from "styled-components";
import EmployeesTable from "../components/Employee/EmployeeTable";
import Button from "../components/commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { Title } from "@mantine/core";
import CreateEmployee from "../components/Employee/CreateEmployee";

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

export default function EmployeesPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <InnerContainer>
        <Title>Empleados</Title>

        <CreateEmployee opened={opened} close={close} />

        <Button color="blue" leftIcon={<FaCirclePlus />} onClick={open}>
          Crear
        </Button>
      </InnerContainer>

      <EmployeesTable />
    </Container>
  );
}
