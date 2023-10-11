import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../utils/constants";
import { getPayroll } from "../api/payroll";
import { useParams } from "react-router-dom";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { Card, Divider, Flex, Grid, Text, Title } from "@mantine/core";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import styled from "styled-components";
import PayrollDetailTable from "../components/Payroll/PayrollDetailTable";
import { PayrollData } from "../components/Payroll/GeneratePayrollTable";
import Badge from "../components/commons/Badge";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function PayrollDetail() {
  const { payrollId } = useParams();

  const { data } = useQuery({
    queryKey: [QueryKey.Payroll, { where: { payrollId } }],
    queryFn: () => getPayroll({ where: { payrollId } }),
  });

  if (!data || !data.payroll_data) return null;

  const payrollData = JSON.parse(
    data.payroll_data.toString()
  ) as Array<PayrollData>;

  const totalAbsences = payrollData.reduce((total, x) => total + x.absences, 0);
  const absencesDiscount = payrollData.reduce(
    (total, x) => total + x.absences_discount,
    0
  );
  const simpleOvertime = payrollData.reduce(
    (total, x) => total + x.simple_overtime_count,
    0
  );
  const totalSimpleOvertime = payrollData.reduce(
    (total, x) => total + x.simple_overtime_total,
    0
  );
  const doubleOvertime = payrollData.reduce(
    (total, x) => total + x.double_overtime_count,
    0
  );
  const totalDoubleOvertime = payrollData.reduce(
    (total, x) => total + x.double_overtime_total,
    0
  );
  const igssDiscount = payrollData.reduce(
    (total, x) => total + x.igss_discount,
    0
  );
  const totalLiquid = payrollData.reduce(
    (total, x) => total + x.total_liquid,
    0
  );

  return (
    <Container>
      <InnerContainer>
        <FaMoneyCheckDollar size={64} />

        <Text fw="bold" size="xl">
          Detalle de nómina
        </Text>

        <Badge color="blue" size="xl">
          {format(
            new Date(data.payroll_date.replace(/-/g, "/")),
            "MMMM, yyyy",
            {
              locale: es,
              weekStartsOn: 1,
            }
          ).toUpperCase()}
        </Badge>
      </InnerContainer>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ marginTop: 16 }}
      >
        <Flex direction="column" gap={32} mt={16}>
          <Title>Datos generales</Title>

          <Divider />

          <Grid gutter="xl">
            <Grid.Col span={4}>
              <Title order={4}>
                Ausencias sin goce de sueldo: {totalAbsences}
              </Title>
            </Grid.Col>

            <Grid.Col span={4}>
              <Title order={4}>
                Descuento por ausencias (GTQ): {absencesDiscount.toFixed(2)}
              </Title>
            </Grid.Col>

            <Grid.Col span={4}>
              <Title order={4}>
                Horas extras simples (HES): {simpleOvertime}
              </Title>
            </Grid.Col>

            <Grid.Col span={4}>
              <Title order={4}>
                Total HES (GTQ): {totalSimpleOvertime.toFixed(2)}
              </Title>
            </Grid.Col>

            <Grid.Col span={4}>
              <Title order={4}>
                Horas extras dobles (HED): {doubleOvertime}
              </Title>
            </Grid.Col>
            <Grid.Col span={4}>
              <Title order={4}>
                Total HED (GTQ): {totalDoubleOvertime.toFixed(2)}
              </Title>
            </Grid.Col>

            <Grid.Col span={4}>
              <Title order={4}>
                Descuento de IGSS (GTQ): {igssDiscount.toFixed(2)}
              </Title>
            </Grid.Col>

            <Grid.Col span={4}>
              <Title order={4}>
                Total líquido (GTQ): {totalLiquid.toFixed(2)}
              </Title>
            </Grid.Col>
          </Grid>
        </Flex>
      </Card>

      <Divider size="lg" label="Detalle" labelPosition="center" />

      <PayrollDetailTable data={payrollData} />
    </Container>
  );
}
