// frontend/src/pages/ProjectListPage.styles.js
import styled from "styled-components";
import theme from "../theme";

export const ProjectListPageContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px; /* Ensure navbar does not cover content */
`;

export const ProjectListPageHeading = styled.h2`
  font-size: 24px;
  color: ${theme.colors.darkGrey};
`;
