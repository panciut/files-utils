// frontend/src/components/FilesList.styles.js

import styled from "styled-components";
import theme from "../theme";

export const FileListContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  padding: 10px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  box-sizing: border-box;
`;

export const FileItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  background-color: ${theme.colors.lightGrey};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
`;

export const FileItemText = styled.div`
  color: ${theme.colors.darkGrey};
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
    filter: invert(23%) sepia(98%) saturate(7496%) hue-rotate(356deg)
      brightness(89%) contrast(130%); /* Red color */
  }
`;
