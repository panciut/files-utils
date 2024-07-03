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
  display: flex;
  align-items: center;
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
  border-radius: 10px;
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

export const ProjectItemLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.orange};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
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
  color: ${theme.colors.orange};
`;

export const DeleteButton = styled.button`
  padding: 10px;
  background-color: ${theme.colors.orange};
  border: 2px solid ${theme.colors.black};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: ${theme.colors.black};
  position: relative;
  z-index: 1;

  &:hover {
    background-color: ${theme.colors.darkOrange};
  }
`;

export const AddButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  img {
    width: 24px;
    height: 24px;
  }
`;
