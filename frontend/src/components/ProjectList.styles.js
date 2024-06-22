// frontend/src/components/ProjectList.styles.js
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link
import theme from "../theme";

export const ProjectListContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const ProjectListHeading = styled.h2`
  font-size: 24px;
  color: ${theme.colors.darkGrey};
`;

export const ProjectItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 20px;
  margin: 10px 0;
  background-color: ${theme.colors.darkGrey};
  border: 3px solid ${theme.colors.black};
  box-shadow: inset 0 -3px 0 0 ${theme.colors.orange};
  border-radius: 10px;
  position: relative;
`;

export const ProjectItemLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.orange};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  left: 0;
  top: 0;

  &:hover {
    color: ${theme.colors.darkOrange};
  }
`;

export const ProjectItemText = styled.div`
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${theme.colors.white};
`;

export const DeleteButton = styled.button`
  padding: 10px;
  background-color: ${theme.colors.orange};
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: ${theme.colors.white};
  position: relative;
  z-index: 1;

  &:hover {
    background-color: ${theme.colors.darkOrange};
  }
`;
