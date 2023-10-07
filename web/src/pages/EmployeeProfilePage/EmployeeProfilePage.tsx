import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QueryKey } from "../../utils/constants";
import { getEmployee } from "../../api/employee";
import styled from "styled-components";
import { Title } from "@mantine/core";
import Button from "../../components/commons/Button";
import {
  FaClock,
  FaMoneyBillTrendUp,
  FaPersonWalkingLuggage,
} from "react-icons/fa6";
import CreateWorkAbsence from "../../components/WorkAbsence/CreateWorkAbsence";
import { useDisclosure } from "@mantine/hooks";
import Badge from "../../components/commons/Badge";
import { JobInfo, OvertimeAndAbsences, PersonalInfo } from "./Sections";
import CreateOvertime from "../../components/Overtime/CreateOvertime";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export default function EmployeeProfilePage() {
  const { employeeId } = useParams();
  const [
    openedWorkAbsence,
    { open: openWorkAbsence, close: closeWorkAbsence },
  ] = useDisclosure(false);
  const [openedOvertime, { open: openOvertime, close: closeOvertime }] =
    useDisclosure(false);

  const { data } = useQuery({
    queryKey: [QueryKey.Employee, { where: { employeeId } }],
    queryFn: () => getEmployee({ where: { employeeId } }),
  });

  return (
    <Container>
      <Title>
        {data?.first_name} {data?.last_name}
      </Title>

      <BadgeContainer>
        <Badge color="blue" size="xl">
          {data?.employee_job[0]?.job?.department?.name}
        </Badge>

        <Badge color="cyan" size="xl">
          {data?.employee_job[0]?.job?.title}
        </Badge>
      </BadgeContainer>

      <Title order={5}>{data?.employee_job[0]?.job?.description}</Title>

      <ButtonsContainer>
        <Button color="blue" leftIcon={<FaClock />} onClick={openOvertime}>
          Agregar horas extras
        </Button>

        <CreateOvertime opened={openedOvertime} close={closeOvertime} />

        <Button
          color="blue"
          leftIcon={<FaPersonWalkingLuggage />}
          onClick={openWorkAbsence}
        >
          Agregar ausencia laboral
        </Button>

        <CreateWorkAbsence
          opened={openedWorkAbsence}
          close={closeWorkAbsence}
        />

        <Button
          color="blue"
          leftIcon={<FaMoneyBillTrendUp />}
          onClick={() => undefined}
        >
          Agregar aumento
        </Button>
      </ButtonsContainer>

      <PersonalInfo employee={data} />
      <JobInfo employee={data} />
      <OvertimeAndAbsences employee={data} />
    </Container>
  );
}
