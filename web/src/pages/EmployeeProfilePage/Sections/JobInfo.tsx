import { Employee } from "../../../api/employee";
import { Card, Divider, Flex, Grid, Title } from "@mantine/core";
import { format } from "date-fns";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

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

          {employee?.dpi_copy && (
            <Grid.Col span={4}>
              <Title order={4}>
                Fotocopia de DPI:{" "}
                <a href={employee.dpi_copy} rel="noreferrer" target="_blank">
                  <FaArrowUpRightFromSquare />
                </a>
              </Title>
            </Grid.Col>
          )}

          {employee?.title_photostatic && (
            <Grid.Col span={4}>
              <Title order={4}>
                Fotostática de título:{" "}
                <a
                  href={employee.title_photostatic}
                  rel="noreferrer"
                  target="_blank"
                >
                  <FaArrowUpRightFromSquare />
                </a>
              </Title>
            </Grid.Col>
          )}

          {employee?.criminal_record && (
            <Grid.Col span={4}>
              <Title order={4}>
                Antecedentes penales:{" "}
                <a
                  href={employee.criminal_record}
                  rel="noreferrer"
                  target="_blank"
                >
                  <FaArrowUpRightFromSquare />
                </a>
              </Title>
            </Grid.Col>
          )}

          {employee?.police_record && (
            <Grid.Col span={4}>
              <Title order={4}>
                Antecedentes policíacos:{" "}
                <a
                  href={employee.police_record}
                  rel="noreferrer"
                  target="_blank"
                >
                  <FaArrowUpRightFromSquare />
                </a>
              </Title>
            </Grid.Col>
          )}
        </Grid>
      </Flex>
    </Card>
  );
};
