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

export const FileList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin: 10px 0;
    color: ${theme.colors.darkGrey};
  }
`;
