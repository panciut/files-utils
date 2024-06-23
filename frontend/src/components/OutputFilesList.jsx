// frontend/src/components/OutputFilesList.jsx

import React, { useState } from 'react';
import { OutputFilesListContainer, OutputFileItem, OutputFileName, CopyButton, OutputContent, LineCount } from './OutputFilesList.styles';
import copyIcon from '../assets/copy.svg'; // Ensure you have this asset

const OutputFilesList = ({ files, onCopyContent, onFileClick }) => {
    const [selectedFileContent, setSelectedFileContent] = useState('');

    const handleFileClick = async (fileName, fileContent) => {
        if (fileContent) {
            setSelectedFileContent(fileContent);
        } else {
            await onFileClick(fileName);
            const file = files.find(file => file.name === fileName);
            setSelectedFileContent(file ? file.content : '');
        }
    };

    return (
        <div>
            <OutputFilesListContainer>
                {files.map((file) => (
                    <OutputFileItem key={file.name}>
                        <LineCount>{file.lines}</LineCount>
                        <OutputFileName onClick={() => handleFileClick(file.name, file.content)}>
                            {file.name}
                        </OutputFileName>
                        <CopyButton onClick={() => onCopyContent(file.content)}>
                            <img src={copyIcon} alt="Copy" />
                        </CopyButton>
                    </OutputFileItem>
                ))}
            </OutputFilesListContainer>
            {selectedFileContent && (
                <OutputContent>
                    <h3>File Content</h3>
                    <pre><code>{selectedFileContent}</code></pre>
                </OutputContent>
            )}
        </div>
    );
};

export default OutputFilesList;
