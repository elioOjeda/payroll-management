import { Title } from "@mantine/core";
import styled from "styled-components";
import Button from "../components/commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import WorkAbsencesTable from "../components/WorkAbsence/WorkAbsencesTable";
import CreateWorkAbsence from "../components/WorkAbsence/CreateWorkAbsence";

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

export default function WorkAbsencesPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <InnerContainer>
        <Title>Ausencias laborales</Title>

        <CreateWorkAbsence opened={opened} close={close} />

        <Button color="blue" leftIcon={<FaCirclePlus />} onClick={open}>
          Crear
        </Button>
      </InnerContainer>

      <WorkAbsencesTable />
    </Container>
  );
}
