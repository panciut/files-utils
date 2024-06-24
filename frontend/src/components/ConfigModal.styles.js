// frontend/src/components/ConfigModal.styles.js
import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin: 20px 0;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
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

export const ModalLabel = styled.label`
  font-weight: bold;
`;

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
