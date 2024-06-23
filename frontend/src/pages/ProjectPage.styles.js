// frontend/src/pages/ProjectPage.styles.js
import styled from "styled-components";
import theme from "../theme";

export const ProjectPageContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px; /* Ensure navbar does not cover content */
`;

export const ProjectPageHeading = styled.h1`
  font-size: 32px;
  color: ${theme.colors.darkGrey};
`;

export const CollapsibleSection = styled.div`
  width: 80%;
  margin: 20px 0;
  padding: 20px;
  background-color: ${theme.colors.lightGrey};
  border: 2px solid ${theme.colors.darkGrey};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
`;

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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

export const InputContainer = styled.div`
  width: 100%;
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
