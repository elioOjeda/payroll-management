import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QueryKey } from "../utils/constants";
import { getEmployee } from "../api/employee";
import styled from "styled-components";
import { Title } from "@mantine/core";
import Button from "../components/commons/Button";
import { FaMoneyBillWheat } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function EmployeeProfilePage() {
  const { employeeId } = useParams();

  console.log("Parametro", employeeId);

  const { data } = useQuery({
    queryKey: [QueryKey.Employee, { where: { employeeId } }],
    queryFn: () => getEmployee({ where: { employeeId } }),
  });

  console.log("Empleado", data);

  return (
    <Container>
      <Title>{data?.first_name}</Title>

      <Button
        color="blue"
        leftIcon={<FaMoneyBillWheat />}
        onClick={() => undefined}
      >
        Calcular liquidación
      </Button>
    </Container>
  );
}
