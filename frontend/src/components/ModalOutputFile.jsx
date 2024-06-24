import React from 'react';
import {
    ModalSection,
    ModalSectionHeader,
    ModalSectionTitle,
    ModalIconButton,
    ModalSectionContent,
    ModalLabel,
    ModalInput
} from './ModalOutputFile.styles';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

const ModalOutputFile = ({
    file,
    index,
    isEditing,
    handleEditOutputFile,
    handleDeleteOutputFile,
    setConfig,
    config
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFiles = [...config.outputFiles];
        updatedFiles[index][name] = value.split(',').map(item => item.trim());
        setConfig((prevConfig) => ({
            ...prevConfig,
            outputFiles: updatedFiles
        }));
    };

    return (
        <ModalSection>
            <ModalSectionHeader onClick={() => handleEditOutputFile(index)}>
                <ModalSectionTitle>{file.name}</ModalSectionTitle>
                <ModalIconButton>
                    <img src={editIcon} alt="Edit" />
                    <img src={deleteIcon} alt="Delete" onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOutputFile(index);
                    }} />
                </ModalIconButton>
            </ModalSectionHeader>
            <ModalSectionContent isCollapsed={isEditing !== index}>
                <ModalLabel>Include Paths</ModalLabel>
                <ModalInput
                    type="text"
                    name="includePaths"
                    value={Array.isArray(file.includePaths) ? file.includePaths.join(', ') : file.includePaths}
                    onChange={handleInputChange}
                    placeholder="Include Paths"
                    disabled={isEditing !== index}
                />
                <ModalLabel>Include File Types (e.g., .js, .json)</ModalLabel>
                <ModalInput
                    type="text"
                    name="includeFileTypes"
                    value={Array.isArray(file.includeFileTypes) ? file.includeFileTypes.join(', ') : file.includeFileTypes || ''}
                    onChange={handleInputChange}
                    placeholder="Include File Types"
                    disabled={isEditing !== index}
                />
                <ModalLabel>Exclude File Types (e.g., .md)</ModalLabel>
                <ModalInput
                    type="text"
                    name="excludeFileTypes"
                    value={Array.isArray(file.excludeFileTypes) ? file.excludeFileTypes.join(', ') : file.excludeFileTypes || ''}
                    onChange={handleInputChange}
                    placeholder="Exclude File Types"
                    disabled={isEditing !== index}
                />
                <ModalLabel>Exclude Directories</ModalLabel>
                <ModalInput
                    type="text"
                    name="excludeDirectories"
                    value={Array.isArray(file.excludeDirectories) ? file.excludeDirectories.join(', ') : file.excludeDirectories || ''}
                    onChange={handleInputChange}
                    placeholder="Exclude Directories"
                    disabled={isEditing !== index}
                />
            </ModalSectionContent>
        </ModalSection>
    );
};

export default ModalOutputFile;
