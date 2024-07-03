// frontend/src/pages/ProjectPage.styles.js

import styled from "styled-components";
import theme from "../theme";

export const ProjectPageContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative; /* Add this for positioning the popup */
`;

export const ProjectPageHeading = styled.h1`
  font-size: 32px;
  color: ${theme.colors.darkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ProjectInfoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const ProjectInfoPopup = styled.div`
  position: absolute;
  top: 0;
  left: calc(70%); /* Position next to the button */
  width: 250px;
  padding: 15px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const CollapsibleSection = styled.div`
  width: 80%;
  margin: 20px 0;
  padding: 20px;
  background-color: ${theme.colors.lightGrey};
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1; /* Add this to make the section take available space */
  display: flex;
  flex-direction: column; /* Add this to allow content to expand */
  cursor: pointer;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  color: ${theme.colors.darkGrey};
  cursor: pointer;
  margin: 0;
  text-align: left;
`;

export const SectionContent = styled.div`
  margin-top: 10px;
  display: ${(props) => (props.isCollapsed ? "none" : "block")};
  height: 100%; /* Add this to make content take full height */
  overflow-y: auto; /* Add scroll if content overflows */
`;

export const ButtonContainer = styled.div`
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.orange};
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.darkOrange};
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const TreeFileList = styled.ul`
  max-height: 450px;
  overflow-y: auto;
  width: 100%;
  padding: 10px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  box-sizing: border-box;
`;

export const TreeFileItem = styled.li`
  padding: 10px;
  margin: 10px 0;
  background-color: ${theme.colors.lightGrey};
  border: 1px solid ${theme.colors.darkGrey};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.grey};
  }
`;

export const TreeFileContent = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
`;
