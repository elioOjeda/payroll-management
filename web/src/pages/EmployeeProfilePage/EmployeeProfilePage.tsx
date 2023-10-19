import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QueryKey } from "../../utils/constants";
import { getEmployee } from "../../api/employee";
import styled from "styled-components";
import { ActionIcon, Flex, Image, Title } from "@mantine/core";
import Button from "../../components/commons/Button";
import {
  FaClock,
  FaMoneyBillTrendUp,
  FaPencil,
  FaPersonWalkingLuggage,
} from "react-icons/fa6";
import CreateWorkAbsence from "../../components/WorkAbsence/CreateWorkAbsence";
import { useDisclosure } from "@mantine/hooks";
import Badge from "../../components/commons/Badge";
import { JobInfo, OvertimeAndAbsences, PersonalInfo } from "./Sections";
import CreateOvertime from "../../components/Overtime/CreateOvertime";
import UpdateEmployee from "../../components/Employee/UpdateEmployee";
import CreateRaise from "../../components/Raise/CreateRaise";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const UpdateEmployeeContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export default function EmployeeProfilePage() {
  const { employeeId } = useParams();
  const [
    openedUpdateEmployee,
    { open: openUpdateEmployee, close: closeUpdateEmployee },
  ] = useDisclosure(false);
  const [
    openedWorkAbsence,
    { open: openWorkAbsence, close: closeWorkAbsence },
  ] = useDisclosure(false);
  const [openedOvertime, { open: openOvertime, close: closeOvertime }] =
    useDisclosure(false);
  const [openedRaise, { open: openRaise, close: closeRaise }] =
    useDisclosure(false);

  const { data } = useQuery({
    queryKey: [QueryKey.Employee, { where: { employeeId } }],
    queryFn: () => getEmployee({ where: { employeeId } }),
  });

  return (
    <Container>
      {data?.photo_url && (
        <Image radius="xl" height={250} width={250} src={data.photo_url} />
      )}

      <UpdateEmployeeContainer>
        <Title>
          {data?.first_name} {data?.last_name}
        </Title>

        {data && (
          <div>
            <ActionIcon color="blue" onClick={openUpdateEmployee} size="lg">
              <FaPencil />
            </ActionIcon>

            <UpdateEmployee
              employee={data}
              opened={openedUpdateEmployee}
              close={closeUpdateEmployee}
            />
          </div>
        )}
      </UpdateEmployeeContainer>

      <BadgeContainer>
        <Badge color="blue" size="xl">
          {data?.employee_job[0]?.job?.department?.name}
        </Badge>

        <Badge color="cyan" size="xl">
          {data?.employee_job[0]?.job?.title}
        </Badge>
      </BadgeContainer>

      <Title order={5}>{data?.employee_job[0]?.job?.description}</Title>

      <Flex
        mih={50}
        gap="sm"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
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
          onClick={openRaise}
        >
          Agregar aumento
        </Button>

        <CreateRaise opened={openedRaise} close={closeRaise} />
      </Flex>

      <PersonalInfo employee={data} />
      <JobInfo employee={data} />
      <OvertimeAndAbsences employee={data} />
    </Container>
  );
}
