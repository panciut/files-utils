// frontend/src/pages/HomePage.styles.js

import styled from "styled-components";
import theme from "../theme";

export const HomePageContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
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

export const ProjectListContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
  margin-top: 40px; /* Add margin to separate from other content */
`;

export const ProjectListHeading = styled.h2`
  font-size: 24px;
  color: ${theme.colors.darkGrey};
`;

export const ProjectListItem = styled.li`
  list-style-type: none;
  margin: 10px 0;

  a {
    text-decoration: none;
    color: ${theme.colors.orange};

    &:hover {
      color: ${theme.colors.darkOrange};
    }
  }
`;
