// frontend/src/components/Navbar.styles.js
import styled from "styled-components";
import theme from "../theme";

export const NavbarContainer = styled.nav`
  width: 100%;
  background-color: ${theme.colors.darkGrey};
  padding: 27px 30px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 3px solid ${theme.colors.black};
  box-shadow: inset 0 -3px 0 0 ${theme.colors.orange};
  z-index: 1000;
  box-sizing: border-box;
`;

export const NavLink = styled.a`
  color: ${theme.colors.white};
  text-decoration: none;
  font-size: 16px;
  margin: 0 15px;
  transition: color 0.3s ease;
  display: inline-block;

  &:hover {
    color: ${theme.colors.orange};
  }
`;
