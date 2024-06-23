// frontend/src/components/FilesList.jsx

import React from 'react';
import { FileListContainer, FileItemContainer, FileItemText, DeleteButton } from './FilesList.styles';
import deleteIcon from '../assets/delete.svg'; // Ensure you have this asset

const FilesList = ({ files, onRemoveFile }) => {
    return (
        <FileListContainer>
            {files.map((filePath) => (
                <FileItemContainer key={filePath}>
                    <FileItemText>{filePath}</FileItemText>
                    <DeleteButton onClick={() => onRemoveFile(filePath)}>
                        <img src={deleteIcon} alt="Delete" />
                    </DeleteButton>
                </FileItemContainer>
            ))}
        </FileListContainer>
    );
};

export default FilesList;
