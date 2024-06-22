// frontend/src/pages/CreateProjectPage.styles.js
import styled from "styled-components";
import theme from "../theme";

export const CreateProjectContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
`;

export const CreateProjectHeading = styled.h1`
  font-size: 32px;
  color: ${theme.colors.darkGrey};
`;

export const FormContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  background-color: ${theme.colors.lightGrey};
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 4px;
`;

export const FormButton = styled.button`
  padding: 10px 20px;
  background-color: ${theme.colors.orange};
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.darkOrange};
  }
`;
