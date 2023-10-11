import { Card, Grid, Text, Title } from "@mantine/core";
import styled from "styled-components";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import Button from "../components/commons/Button";
import { Link } from "react-router-dom";
import { QueryKey } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getPayrolls } from "../api/payroll";
import useAppContext from "../hooks/useAppContext";
import { useState } from "react";
import CompanySelect from "../components/CompanySelect";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

const StyledLink = styled(Link)`
  alignitems: center;
  display: flex;
  gap: 8px;
  text-decoration: none;
`;

const StyledCard = styled(Card)`
  &:hover {
    transform: translateY(-15px);
    transition: transform 0.4s ease;
    opacity: 0.5;
  }
`;

export default function PayrollsPage() {
  const { isSuperAdmin, user } = useAppContext();
  const [companyId, setCompanyId] = useState<string>();

  const { data } = useQuery({
    queryKey: [
      QueryKey.Payrolls,
      {
        where: {
          companyId: isSuperAdmin ? companyId : user?.user_metadata?.company_id,
        },
      },
    ],
    queryFn: () =>
      getPayrolls({
        where: {
          companyId: isSuperAdmin ? companyId : user?.user_metadata?.company_id,
        },
      }),
  });

  return (
    <Container>
      <InnerContainer>
        <Title>Nóminas</Title>

        <StyledLink to="/generate-payroll">
          <Button
            color="blue"
            leftIcon={<FaMoneyCheckDollar />}
            onClick={() => undefined}
            variant="subtle"
          >
            Generar nómina
          </Button>
        </StyledLink>

        {isSuperAdmin && (
          <CompanySelect
            clearable={false}
            label="Empresa"
            onChange={setCompanyId}
            placeholder="Seleccione una empresa"
            required
            value={companyId}
            style={{ width: 250 }}
          />
        )}
      </InnerContainer>

      <Grid gutter="xl">
        {data &&
          data.map((x) => (
            <Grid.Col key={x.id} span={4}>
              <StyledLink to={`/payrolls/${x.id}`}>
                <StyledCard
                  shadow="xl"
                  padding="lg"
                  radius="md"
                  w="100%"
                  withBorder
                >
                  <FaMoneyCheckDollar size={64} />
                  <Text
                    fw="bold"
                    size="xl"
                    variant="gradient"
                    gradient={{ from: "indigo", to: "red", deg: 200 }}
                  >
                    {format(
                      new Date(x.payroll_date.replace(/-/g, "/")),
                      "MMMM, yyyy",
                      {
                        locale: es,
                        weekStartsOn: 1,
                      }
                    ).toUpperCase()}
                  </Text>
                </StyledCard>
              </StyledLink>
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
}
