// frontend/src/components/ConfigModal.jsx

import React, { useState, useEffect } from 'react';
import { getProjectConfig, updateProjectConfig } from '../services/api';
import closeIcon from '../assets/close.svg';
import addIcon from '../assets/add.svg';
import deleteIcon from '../assets/delete.svg'; // Import delete icon
import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalInput,
    ModalButton,
    ModalLabel,
    ModalSection,
    ModalSectionHeader,
    ModalSectionTitle,
    ModalIconButton,
    ModalSectionContent,
    PathList,
    PathItem,
    RemovePathButton
} from './ConfigModal.styles';
import ModalOutputFile from './ModalOutputFile';

const ConfigModal = ({ projectName, onClose }) => {
    const [config, setConfig] = useState({
        outputDirectory: '',
        outputFiles: [],
        maxClipboardLines: 0
    });
    const [newOutputFile, setNewOutputFile] = useState({
        name: '',
        includePaths: [],
        includeFileTypes: '',
        excludeFileTypes: '',
        excludeDirectories: ''
    });
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const projectConfig = await getProjectConfig(projectName);
                setConfig(projectConfig);
            } catch (error) {
                console.error('Failed to fetch project config', error);
            }
        };
        fetchConfig();
    }, [projectName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfig((prevConfig) => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const handleNewOutputFileChange = (e) => {
        const { name, value } = e.target;
        setNewOutputFile((prevOutputFile) => ({
            ...prevOutputFile,
            [name]: value
        }));
    };

    const handleFileSelector = async () => {
        const directories = await window.electron.selectDirectories();
        if (directories.length > 0) {
            const formattedDirectories = directories.map(dir => dir.endsWith('/') ? dir : `${dir}/`);
            setNewOutputFile((prevOutputFile) => ({
                ...prevOutputFile,
                includePaths: [...prevOutputFile.includePaths, ...formattedDirectories]
            }));
        }
    };

    const handleRemovePath = (index) => {
        setNewOutputFile((prevOutputFile) => ({
            ...prevOutputFile,
            includePaths: prevOutputFile.includePaths.filter((_, i) => i !== index)
        }));
    };

    const handleAddOutputFile = () => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            outputFiles: [...prevConfig.outputFiles, {
                ...newOutputFile,
                includeFileTypes: newOutputFile.includeFileTypes.split(',').map(type => type.trim()),
                excludeFileTypes: newOutputFile.excludeFileTypes.split(',').map(type => type.trim()),
                excludeDirectories: newOutputFile.excludeDirectories.split(',').map(dir => dir.trim())
            }]
        }));
        setNewOutputFile({
            name: '',
            includePaths: [],
            includeFileTypes: '',
            excludeFileTypes: '',
            excludeDirectories: ''
        });
        setIsAdding(false);
    };

    const handleEditOutputFile = (index) => {
        setIsEditing(isEditing === index ? null : index);
    };

    const handleDeleteOutputFile = (index) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            outputFiles: prevConfig.outputFiles.filter((_, i) => i !== index)
        }));
    };

    const handleSaveConfig = async () => {
        try {
            await updateProjectConfig(projectName, config);
            alert('Configuration saved successfully');
            onClose();
        } catch (error) {
            console.error('Failed to save project config', error);
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Configure Project</ModalTitle>
                    <ModalCloseButton onClick={onClose}>
                        <img src={closeIcon} alt="Close" />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <ModalLabel>Output Directory</ModalLabel>
                    <ModalInput
                        type="text"
                        name="outputDirectory"
                        value={config.outputDirectory}
                        onChange={handleInputChange}
                        placeholder="Output Directory"
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <ModalLabel style={{ marginRight: 'auto' }}>Output Files</ModalLabel>
                        <ModalIconButton onClick={() => setIsAdding(!isAdding)} style={{ marginBottom: '10px' }}>
                            <img src={addIcon} alt="Add" />
                        </ModalIconButton>
                    </div>
                    {isAdding && (
                        <ModalSection>
                            <ModalSectionHeader>
                                <ModalSectionTitle>Add New Output File</ModalSectionTitle>
                                <ModalIconButton onClick={() => setIsAdding(false)}>
                                    <img src={closeIcon} alt="Close" />
                                </ModalIconButton>
                            </ModalSectionHeader>
                            <ModalSectionContent>
                                <ModalInput
                                    type="text"
                                    name="name"
                                    value={newOutputFile.name}
                                    onChange={handleNewOutputFileChange}
                                    placeholder="File Name"
                                />
                                <ModalLabel>Include Paths</ModalLabel>
                                <PathList>
                                    {newOutputFile.includePaths.map((path, index) => (
                                        <PathItem key={index}>
                                            {path}
                                            <RemovePathButton onClick={() => handleRemovePath(index)}>
                                                <img src={deleteIcon} alt="Remove" />
                                            </RemovePathButton>
                                        </PathItem>
                                    ))}
                                </PathList>
                                <ModalInput
                                    type="text"
                                    name="includePaths"
                                    value={newOutputFile.includePaths.join(', ')}
                                    placeholder="Select Paths"
                                    readOnly
                                    onClick={handleFileSelector}
                                />
                                <ModalLabel>Include File Types (e.g., .js, .json)</ModalLabel>
                                <ModalInput
                                    type="text"
                                    name="includeFileTypes"
                                    value={newOutputFile.includeFileTypes}
                                    onChange={handleNewOutputFileChange}
                                    placeholder="Include File Types"
                                />
                                <ModalLabel>Exclude File Types (e.g., .md)</ModalLabel>
                                <ModalInput
                                    type="text"
                                    name="excludeFileTypes"
                                    value={newOutputFile.excludeFileTypes}
                                    onChange={handleNewOutputFileChange}
                                    placeholder="Exclude File Types"
                                />
                                <ModalLabel>Exclude Directories</ModalLabel>
                                <ModalInput
                                    type="text"
                                    name="excludeDirectories"
                                    value={newOutputFile.excludeDirectories}
                                    onChange={handleNewOutputFileChange}
                                    placeholder="Exclude Directories"
                                />
                                <ModalButton onClick={handleAddOutputFile}>Add Output File</ModalButton>
                            </ModalSectionContent>
                        </ModalSection>
                    )}
                    {config.outputFiles.map((file, index) => (
                        <ModalOutputFile
                            key={index}
                            file={file}
                            index={index}
                            isEditing={isEditing}
                            handleEditOutputFile={handleEditOutputFile}
                            handleDeleteOutputFile={handleDeleteOutputFile}
                            setConfig={setConfig}
                            config={config}
                        />
                    ))}
                    <ModalLabel>Max Clipboard Lines</ModalLabel>
                    <ModalInput
                        type="number"
                        name="maxClipboardLines"
                        value={config.maxClipboardLines}
                        onChange={handleInputChange}
                        placeholder="Max Clipboard Lines"
                    />
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={handleSaveConfig}>Save Configuration</ModalButton>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default ConfigModal;
