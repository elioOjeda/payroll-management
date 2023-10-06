import { Title } from "@mantine/core";
import styled from "styled-components";
import JobsTable from "../components/Job/JobsTable";
import CreateJob from "../components/Job/CreateJob";
import Button from "../components/commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";

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

export default function JobPositionsPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <InnerContainer>
        <Title>Puestos laborales</Title>

        <CreateJob opened={opened} close={close} />

        <Button color="blue" leftIcon={<FaCirclePlus />} onClick={open}>
          Crear
        </Button>
      </InnerContainer>

      <JobsTable />
    </Container>
  );
}
