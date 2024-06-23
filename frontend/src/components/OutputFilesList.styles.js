// frontend/src/components/OutputFilesList.styles.js

import styled from "styled-components";
import theme from "../theme";

export const OutputFilesListContainer = styled.div`
  max-height: 450px;
  overflow-y: auto;
  width: 100%;
  padding: 10px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  box-sizing: border-box;
`;

export const OutputFileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  background-color: ${theme.colors.lightGrey};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
`;

export const LineCount = styled.div`
  margin-right: 10px;
  color: ${theme.colors.darkGrey};
`;

export const OutputFileName = styled.div`
  flex-grow: 1;
  color: ${theme.colors.darkGrey};
  cursor: pointer;
`;

export const CopyButton = styled.button`
  background-color: ${theme.colors.grey};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%)
      contrast(0%);
  }
`;

export const CopyDisplayedButton = styled.button`
  background-color: ${theme.colors.grey};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;

  img {
    width: 20px;
    height: 20px;
    filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%)
      contrast(0%);
  }
`;

export const OutputContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const OutputContent = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  box-sizing: border-box;
  text-align: left;
  position: relative;

  h3 {
    margin-top: 0;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }
`;
