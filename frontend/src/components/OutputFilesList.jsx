// frontend/src/components/OutputFilesList.jsx

import React, { useState } from 'react';
import { OutputFilesListContainer, OutputFileItem, OutputFileName, CopyButton, OutputContent, LineCount, CopyDisplayedButton, OutputContentHeader } from './OutputFilesList.styles';
import copyIcon from '../assets/copy.svg'; // Ensure you have this asset

const OutputFilesList = ({ files, onCopyContent, onFileClick }) => {
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [selectedFileLines, setSelectedFileLines] = useState(0);

    const handleFileClick = async (fileName, fileContent) => {
        if (fileName === selectedFileName) {
            // If the same file is clicked again, hide the display section
            setSelectedFileName('');
            setSelectedFileContent('');
            setSelectedFileLines(0);
        } else {
            setSelectedFileName(fileName);
            if (fileContent) {
                setSelectedFileContent(fileContent);
                setSelectedFileLines(fileContent.split('\n').length);
            } else {
                const content = await onFileClick(fileName);
                setSelectedFileContent(content || '');
                setSelectedFileLines(content ? content.split('\n').length : 0);
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
            <OutputFilesListContainer>
                {files.map((file) => (
                    <OutputFileItem key={file.name}>
                        <LineCount>{file.lines}</LineCount>
                        <OutputFileName onClick={() => handleFileClick(file.name, file.content)}>
                            {file.name}
                        </OutputFileName>
                        <CopyButton onClick={() => handleCopyFileContent(file.name)}>
                            <img src={copyIcon} alt="Copy" />
                        </CopyButton>
                    </OutputFileItem>
                ))}
            </OutputFilesListContainer>
            {selectedFileContent && (
                <OutputContent>
                    <OutputContentHeader>
                        <LineCount>{selectedFileLines} lines</LineCount>
                        <CopyDisplayedButton onClick={() => onCopyContent(selectedFileContent)}>
                            <img src={copyIcon} alt="Copy" />
                        </CopyDisplayedButton>
                    </OutputContentHeader>
                    <pre><code>{selectedFileContent}</code></pre>
                </OutputContent>
            )}
        </div>
    );
};

export default OutputFilesList;
