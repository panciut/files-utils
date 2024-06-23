// frontend/src/components/FilesList.jsx

import React from 'react';
import { FileListContainer, FileList } from './FilesList.styles';

const FilesList = ({ files }) => {
    return (
        <FileListContainer>
            <FileList>
                {files.map((filePath) => (
                    <li key={filePath}>{filePath}</li>
                ))}
            </FileList>
        </FileListContainer>
    );
};

export default FilesList;
