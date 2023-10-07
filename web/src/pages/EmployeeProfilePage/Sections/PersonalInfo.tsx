import React from "react";
import { Employee } from "../../../api/employee";
import { Card, Divider, Flex, Grid, Title } from "@mantine/core";
import { format } from "date-fns";

type Props = {
  employee?: Employee;
};

export const PersonalInfo = ({ employee }: Props) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ marginTop: 16 }}
    >
      <Flex direction="column" gap={32} mt={16}>
        <Title>Información personal</Title>

        <Divider />

        <Grid gutter="xl">
          <Grid.Col span={4}>
            <Title order={4}>Nombres: {employee?.first_name}</Title>
          </Grid.Col>

          <Grid.Col span={4}>
            <Title order={4}>Apellidos: {employee?.last_name}</Title>
          </Grid.Col>

          {employee?.birth_date && (
            <Grid.Col span={4}>
              <Title order={4}>
                Fecha de nacimiento:{" "}
                {format(new Date(employee.birth_date), "dd/MM/yyyy")}
              </Title>
            </Grid.Col>
          )}

          {employee?.address && (
            <Grid.Col span={4}>
              <Title order={4}>Dirección: {employee.address}</Title>
            </Grid.Col>
          )}

          {employee?.email && (
            <Grid.Col span={4}>
              <Title order={4}>Correo electrónico: {employee.email}</Title>
            </Grid.Col>
          )}

          {employee?.phone && (
            <Grid.Col span={4}>
              <Title order={4}>Teléfono: {employee.phone}</Title>
            </Grid.Col>
          )}
        </Grid>
      </Flex>
    </Card>
  );
};
