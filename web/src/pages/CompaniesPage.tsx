import styled from "styled-components";
import Button from "../components/commons/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { Title } from "@mantine/core";
import CreateCompany from "../components/Company/CreateCompany";
import CompaniesTable from "../components/Company/CompanyTable/CompaniesTable";

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

export default function CompaniesPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <InnerContainer>
        <Title>Empresas</Title>

        <CreateCompany opened={opened} close={close} />

        <Button color="blue" leftIcon={<FaCirclePlus />} onClick={open}>
          Crear
        </Button>
      </InnerContainer>

      <CompaniesTable />
    </Container>
  );
}
