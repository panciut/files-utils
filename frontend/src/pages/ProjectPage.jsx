// frontend/src/pages/ProjectPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, getProjectFiles, mergeFiles, addFilePaths, removeFilePaths } from '../services/api';
import FilesList from '../components/FilesList';
import addIcon from '../assets/add.svg';
import infoIcon from '../assets/info.svg';
import closeIcon from '../assets/close.svg'; // Ensure you have this asset
import {
    ProjectPageContainer,
    ProjectPageHeading,
    CollapsibleSection,
    SectionTitle,
    SectionContent,
    ButtonContainer,
    Button,
    IconButton,
    SectionHeader,
    ProjectInfoPopup,
    ProjectInfoButton,
    CloseButton
} from './ProjectPage.styles';

const ProjectPage = () => {
    const { projectName } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectFiles, setProjectFiles] = useState([]);
    const [isFilesCollapsed, setIsFilesCollapsed] = useState(true);
    const [isInfoPopupVisible, setIsInfoPopupVisible] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await getProjectDetails(projectName);
                setProjectDetails(details);
                const files = await getProjectFiles(projectName);
                setProjectFiles(files.filePaths);
            } catch (error) {
                console.error('Failed to fetch project details or files', error);
            }
        };
        fetchDetails();
    }, [projectName]);

    const handleMergeFiles = async () => {
        try {
            await mergeFiles(projectName);
            alert('Files merged successfully');
        } catch (error) {
            console.error('Failed to merge files', error);
        }
    };

    const handleFileSelection = async () => {
        const files = await window.electron.selectFiles();
        if (files.length > 0) {
            handleAddFiles(files);
        }
    };

    const handleAddFiles = async (selectedFiles) => {
        try {
            const data = await addFilePaths(projectName, selectedFiles);
            if (data.invalidFilePaths.length > 0) {
                alert(`The following files do not exist: ${data.invalidFilePaths.join(', ')}`);
            }
            if (data.addedPaths.length > 0) {
                alert('Files added successfully');
                setProjectFiles(prevFiles => [...prevFiles, ...data.addedPaths].sort());
            }
        } catch (error) {
            console.error('Failed to add files', error);
        }
    };

    const handleRemoveFile = async (filePath) => {
        try {
            await removeFilePaths(projectName, [filePath]);
            alert('File removed successfully');
            setProjectFiles(prevFiles => prevFiles.filter(file => file !== filePath));
        } catch (error) {
            console.error('Failed to remove file', error);
        }
    };

    const toggleInfoPopup = () => {
        setIsInfoPopupVisible(!isInfoPopupVisible);
    };

    return (
        <ProjectPageContainer>
            <ProjectPageHeading>
                Project: {projectName}
                <ProjectInfoButton onClick={toggleInfoPopup}>
                    <img src={infoIcon} alt="Project Info" />
                </ProjectInfoButton>
            </ProjectPageHeading>
            {isInfoPopupVisible && projectDetails && (
                <ProjectInfoPopup>
                    <CloseButton onClick={toggleInfoPopup}>
                        <img src={closeIcon} alt="Close" />
                    </CloseButton>
                    <p>Number of Files: {projectDetails.project.numberOfFiles}</p>
                    <p>Total Size: {projectDetails.project.size} bytes</p>
                </ProjectInfoPopup>
            )}
            <CollapsibleSection>
                <SectionHeader>
                    <SectionTitle onClick={() => setIsFilesCollapsed(!isFilesCollapsed)}>
                        Files
                    </SectionTitle>
                    <IconButton onClick={handleFileSelection}>
                        <img src={addIcon} alt="Add Files" />
                    </IconButton>
                </SectionHeader>
                <SectionContent isCollapsed={isFilesCollapsed}>
                    <FilesList files={projectFiles} onRemoveFile={handleRemoveFile} />
                </SectionContent>
            </CollapsibleSection>
            <ButtonContainer>
                <Button onClick={handleMergeFiles}>Merge Files</Button>
            </ButtonContainer>
        </ProjectPageContainer>
    );
};

export default ProjectPage;
