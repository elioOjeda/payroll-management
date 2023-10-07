import { Employee } from "../../../api/employee";
import { Card, Divider, Flex, Grid, Title } from "@mantine/core";
import { format } from "date-fns";

type Props = {
  employee?: Employee;
};

export const JobInfo = ({ employee }: Props) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ marginTop: 16 }}
    >
      <Flex direction="column" gap={32} mt={16}>
        <Title>Información laboral</Title>

        <Divider />

        <Grid gutter="xl">
          <Grid.Col span={4}>
            <Title order={4}>
              Departamento: {employee?.employee_job[0]?.job?.department?.name}
            </Title>
          </Grid.Col>

          <Grid.Col span={4}>
            <Title order={4}>
              Puesto: {employee?.employee_job[0]?.job?.title}
            </Title>
          </Grid.Col>

          <Grid.Col span={4}>
            <Title order={4}>
              Salario mensual: GTQ.
              {employee?.employee_job[0]?.current_salary?.toFixed(2)}
            </Title>
          </Grid.Col>

          {employee?.employee_job[0]?.start_date && (
            <Grid.Col span={4}>
              <Title order={4}>
                Fecha de contratación:{" "}
                {format(
                  new Date(employee?.employee_job[0]?.start_date),
                  "dd/MM/yyyy"
                )}
              </Title>
            </Grid.Col>
          )}

          <Grid.Col span={4}>
            <Title order={4}>
              Fecha de finalización:{" "}
              {employee?.employee_job[0]?.end_date
                ? format(
                    new Date(employee.employee_job[0].end_date),
                    "dd/MM/yyyy"
                  )
                : "N/A"}
            </Title>
          </Grid.Col>
        </Grid>
      </Flex>
    </Card>
  );
};
