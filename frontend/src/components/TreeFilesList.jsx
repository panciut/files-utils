// frontend/src/components/TreeFilesList.jsx

import React, { useState } from 'react';
import {
    TreeFilesListContainer,
    TreeFileItem,
    TreeFileName,
    CopyButton,
    TreeContent,
    CopyDisplayedButton,
    TreeContentHeader
} from './TreeFilesList.styles';
import copyIcon from '../assets/copy.svg'; // Ensure you have this asset

const TreeFilesList = ({ files, onCopyContent, onFileClick }) => {
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');

    const handleFileClick = async (fileName, fileContent) => {
        if (fileName === selectedFileName) {
            // If the same file is clicked again, hide the display section
            setSelectedFileName('');
            setSelectedFileContent('');
        } else {
            setSelectedFileName(fileName);
            if (fileContent) {
                setSelectedFileContent(fileContent);
            } else {
                const content = await onFileClick(fileName);
                setSelectedFileContent(content || '');
            }
        }
    };

    const handleCopyFileContent = async (fileName) => {
        const content = await onFileClick(fileName);
        navigator.clipboard.writeText(content || '');
        alert('Content copied to clipboard');
    };

    return (
        <div>
            <TreeFilesListContainer>
                {files.map((file) => (
                    <TreeFileItem key={file}>
                        <TreeFileName onClick={() => handleFileClick(file, selectedFileContent)}>
                            {file}
                        </TreeFileName>
                        <CopyButton onClick={() => handleCopyFileContent(file)}>
                            <img src={copyIcon} alt="Copy" />
                        </CopyButton>
                    </TreeFileItem>
                ))}
            </TreeFilesListContainer>
            {selectedFileContent && (
                <TreeContent>
                    <TreeContentHeader>
                        <CopyDisplayedButton onClick={() => onCopyContent(selectedFileContent)}>
                            <img src={copyIcon} alt="Copy" />
                        </CopyDisplayedButton>
                    </TreeContentHeader>
                    <pre><code>{selectedFileContent}</code></pre>
                </TreeContent>
            )}
        </div>
    );
};

export default TreeFilesList;
