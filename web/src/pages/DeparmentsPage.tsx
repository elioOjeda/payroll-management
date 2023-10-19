import styled from "styled-components";
import Button from "../components/commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { Title } from "@mantine/core";
import CreateDepartment from "../components/Department/CreateDepartment";
import DepartmentsTable from "../components/Department/DepartmentTable/DepartmentsTable";

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

export default function DepartmentsPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <InnerContainer>
        <Title>Departamentos</Title>

        <CreateDepartment opened={opened} close={close} />

        <Button color="blue" leftIcon={<FaCirclePlus />} onClick={open}>
          Crear
        </Button>
      </InnerContainer>

      <DepartmentsTable />
    </Container>
  );
}
