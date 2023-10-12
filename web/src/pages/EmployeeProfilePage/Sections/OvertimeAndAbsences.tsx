import { Card, Divider, Flex, Title } from "@mantine/core";
import { Employee } from "../../../api/employee";
import OvertimeTable from "../../../components/Overtime/OvertimeTable";
import WorkAbsencesTable from "../../../components/WorkAbsence/WorkAbsencesTable";
import RaiseTable from "../../../components/Raise/RaiseTable";

type Props = {
  employee?: Employee;
};

export const OvertimeAndAbsences = ({ employee }: Props) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ marginTop: 16 }}
    >
      <Flex direction="column" gap={32} mt={16}>
        <Title>Tiempo extra</Title>

        <Divider />

        <OvertimeTable employeeId={employee?.id} />
      </Flex>

      <Divider mt={32} />

      <Flex direction="column" gap={32} mt={16}>
        <Title>Ausencias laborales</Title>

        <Divider />

        <WorkAbsencesTable employeeId={employee?.id} />
      </Flex>

      <Divider mt={32} />

      <Flex direction="column" gap={32} mt={16}>
        <Title>Aumentos</Title>

        <Divider />

        <RaiseTable employeeId={employee?.id} />
      </Flex>
    </Card>
  );
};
