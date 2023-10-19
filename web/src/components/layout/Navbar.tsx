import { Navbar as UINavbar } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { Dispatch } from "react";
import {
  FaMoneyCheckDollar,
  FaNetworkWired,
  FaPeopleGroup,
  FaPersonWalkingLuggage,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
};

const StyledLink = styled(Link)`
  alignitems: center;
  display: flex;
  gap: 8px;
  text-decoration: none;
`;

export default function Navbar({ opened, setOpened }: Props) {
  const handleClick = () => {
    setOpened(!opened);
  };
  return (
    <UINavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <StyledLink
        to="/employees"
        onClick={handleClick}
        style={{
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        <FaPeopleGroup size={24} /> Empleados
      </StyledLink>

      <StyledLink
        to="/job-positions"
        onClick={handleClick}
        style={{
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        <FaNetworkWired size={24} /> Puestos laborales
      </StyledLink>

      <StyledLink
        to="/work-absences"
        onClick={handleClick}
        style={{
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        <FaPersonWalkingLuggage size={24} /> Ausencias laborales
      </StyledLink>

      <StyledLink
        to="/payrolls"
        onClick={handleClick}
        style={{
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        <FaMoneyCheckDollar size={24} /> Nóminas
      </StyledLink>
    </UINavbar>
  );
}
