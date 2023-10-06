import { Title } from "@mantine/core";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function RaisesPage() {
  return (
    <Container>
      <Title>Aumentos</Title>
    </Container>
  );
}
