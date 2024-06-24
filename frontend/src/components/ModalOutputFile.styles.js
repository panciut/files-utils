// frontend/src/components/ModalOutputFile.styles.js
import styled from "styled-components";

export const ModalSection = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

export const ModalSectionHeader = styled.div`
  background: #f7f7f7;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const ModalSectionTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

export const ModalIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ModalSectionContent = styled.div`
  padding: 15px;
  display: ${(props) => (props.isCollapsed ? "none" : "block")};
`;

export const ModalLabel = styled.label`
  font-weight: bold;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0 15px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ModalButton = styled.button`
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.black};
  padding: 10px 20px;
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.darkOrange};
  }
`;
