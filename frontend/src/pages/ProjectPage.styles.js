// frontend/src/pages/ProjectPage.styles.js
import styled from "styled-components";
import theme from "../theme";

export const ProjectPageContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
`;

export const ProjectPageHeading = styled.h1`
  font-size: 32px;
  color: ${theme.colors.darkGrey};
`;

export const ProjectDetails = styled.div`
  margin: 20px 0;
  font-size: 18px;
  color: ${theme.colors.darkGrey};
`;

export const FileList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin: 10px 0;
    color: ${theme.colors.darkGrey};
  }
`;

export const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.orange};
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.darkOrange};
  }
`;

export const InputContainer = styled.div`
  margin: 20px 0;
  text-align: left;
  color: ${theme.colors.darkGrey};

  h2 {
    font-size: 24px;
    color: ${theme.colors.darkGrey};
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid ${theme.colors.darkGrey};
    border-radius: 4px;
  }
`;
