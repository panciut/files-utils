// frontend/src/components/ProjectList.styles.js
import styled from "styled-components";
import theme from "../theme";

export const ProjectListContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
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
