// frontend/src/pages/HomePage.styles.js

import styled from "styled-components";
import theme from "../theme";

export const HomePageContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px; /* Add margin to avoid being covered by Navbar */
`;

export const HomePageHeading = styled.h1`
  font-size: 32px;
  color: ${theme.colors.darkGrey};
`;

export const Nav = styled.nav`
  margin-top: 20px;
`;

export const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    margin: 10px 0;

    a {
      text-decoration: none;
      color: ${theme.colors.orange};

      &:hover {
        color: ${theme.colors.darkOrange};
      }
    }
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 20px;
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 10px;
  background-color: ${theme.colors.lightGrey};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${theme.colors.darkGrey};
  margin-bottom: 10px;
`;

export const SectionContent = styled.p`
  font-size: 1rem;
  color: ${theme.colors.darkGrey};
  text-align: center;
`;
