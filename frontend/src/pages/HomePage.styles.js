// frontend/src/pages/HomePage.styles.js

import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link
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
  margin-bottom: 20px;
`;

export const Nav = styled.nav`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  li {
    flex: 1 1 calc(50% - 40px); /* Calculate the width to fit two items per line with gap */
    max-width: 40%; /* Ensure the maximum width is 40% */
    margin: 10px 20px;
  }
`;

export const Section = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh; /* Fixed height of 30% */
  width: 100%; /* Full width of the container */
  padding: 20px;
  border: 2px solid ${theme.colors.black};
  border-radius: 10px;
  background-color: ${theme.colors.lightGrey};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid ${theme.colors.orange};
    border-radius: 10px;
    z-index: -1;
  }
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
