import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Input from "../../components/commons/Input";
import Button from "../../components/commons/Button";
import signInBackground from "../../assets/sign-in-background.jpg";
import { useColorScheme } from "@mantine/hooks";
import { signIn } from "../../api/auth";
import { showCustomNotification } from "../../utils/functions/showCustomNotification";
import PasswordInput from "../../components/commons/PasswordInput";

const Container = styled.div`
  align-items: center;
  background-image: url(${signInBackground});
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 0px;
  padding: 0px;
`;

const StyledForm = styled.form`
  display: flex;
  border-radius: 15px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  flex-direction: column;
  gap: 32px;
  padding: 64px;
`;

export default function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = values;

    const { user, session } = await signIn({ email, password });

    if (!user || !session) {
      return showCustomNotification("error", {
        title: "Inicio de sesión",
        message: "Credenciales incorrectas.",
      });
    }

    const name = user.user_metadata?.name ?? user.email;

    showCustomNotification("success", {
      title: `¡Bienvenido, ${name}!`,
    });
  };

  const colorScheme = useColorScheme();
  const formBackgroundColor = colorScheme === "light" ? "white" : "black";

  return (
    <Container>
      <StyledForm
        onSubmit={handleSubmit}
        style={{ backgroundColor: formBackgroundColor }}
      >
        <Input
          label="Correo electrónico"
          name="email"
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
          size="xl"
          type="email"
          value={values.email}
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          onChange={handleChange}
          placeholder="Contraseña"
          required
          size="xl"
          value={values.password}
        />

        <Button size="xl" type="submit">
          Iniciar sesión
        </Button>
      </StyledForm>
    </Container>
  );
}
