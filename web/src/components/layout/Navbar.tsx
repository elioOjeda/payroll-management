import { Navbar as UINavbar } from "@mantine/core";
import {
  FaArrowTrendUp,
  FaMoneyCheckDollar,
  FaNetworkWired,
  FaPeopleGroup,
  FaPersonWalkingArrowRight,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  opened: boolean;
};

const StyledLink = styled(Link)`
  alignitems: center;
  display: flex;
  gap: 8px;
  text-decoration: none;
`;

export default function Navbar({ opened }: Props) {
  return (
    <UINavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <StyledLink to="/employees">
        <FaPeopleGroup size={24} /> Empleados
      </StyledLink>

      <StyledLink to="/job-positions">
        <FaNetworkWired size={24} /> Puestos laborales
      </StyledLink>

      <StyledLink to="/raises">
        <FaArrowTrendUp size={24} /> Aumentos
      </StyledLink>

      <StyledLink to="/work-absences">
        <FaPersonWalkingArrowRight size={24} /> Ausencias laborales
      </StyledLink>

      <StyledLink to="/payrolls">
        <FaMoneyCheckDollar size={24} /> Nóminas
      </StyledLink>
    </UINavbar>
  );
}
