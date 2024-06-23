// frontend/src/pages/ProjectPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, getProjectFiles, mergeFiles, addFilePaths, removeFilePaths } from '../services/api';
import FilesList from '../components/FilesList';
import addIcon from '../assets/add.svg';
import doneIcon from '../assets/done.svg';
import {
    ProjectPageContainer,
    ProjectPageHeading,
    CollapsibleSection,
    SectionTitle,
    SectionContent,
    ButtonContainer,
    Button,
    InputContainer,
    IconButton,
    SectionHeader
} from './ProjectPage.styles';

const ProjectPage = () => {
    const { projectName } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectFiles, setProjectFiles] = useState([]);
    const [isDetailsCollapsed, setIsDetailsCollapsed] = useState(false);
    const [isFilesCollapsed, setIsFilesCollapsed] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);

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
        setSelectedFiles(files);
    };

    const handleAddFiles = async () => {
        try {
            const data = await addFilePaths(projectName, selectedFiles);
            if (data.invalidFilePaths.length > 0) {
                alert(`The following files do not exist: ${data.invalidFilePaths.join(', ')}`);
            }
            if (data.addedPaths.length > 0) {
                alert('Files added successfully');
                setProjectFiles(prevFiles => [...prevFiles, ...data.addedPaths].sort());
                setSelectedFiles([]); // Clear selected files after adding
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

    return (
        <ProjectPageContainer>
            <ProjectPageHeading>Project: {projectName}</ProjectPageHeading>
            <CollapsibleSection>
                <SectionTitle onClick={() => setIsDetailsCollapsed(!isDetailsCollapsed)}>
                    Project Details
                </SectionTitle>
                <SectionContent isCollapsed={isDetailsCollapsed}>
                    {projectDetails && (
                        <div>
                            <p>Number of Files: {projectDetails.project.numberOfFiles}</p>
                            <p>Total Size: {projectDetails.project.size} bytes</p>
                        </div>
                    )}
                </SectionContent>
            </CollapsibleSection>
            <CollapsibleSection>
                <SectionHeader>
                    <SectionTitle onClick={() => setIsFilesCollapsed(!isFilesCollapsed)}>
                        Files
                    </SectionTitle>
                    <div>
                        <IconButton onClick={handleFileSelection}>
                            <img src={addIcon} alt="Add Files" />
                        </IconButton>
                        <IconButton onClick={handleAddFiles}>
                            <img src={doneIcon} alt="Done Adding Files" />
                        </IconButton>
                    </div>
                </SectionHeader>
                <SectionContent isCollapsed={isFilesCollapsed}>
                    <FilesList files={projectFiles} onRemoveFile={handleRemoveFile} />
                </SectionContent>
                {selectedFiles.length > 0 && (
                    <div>
                        <h2>Selected Files:</h2>
                        <ul>
                            {selectedFiles.map((filePath, index) => (
                                <li key={index}>{filePath}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CollapsibleSection>
            <ButtonContainer>
                <Button onClick={handleMergeFiles}>Merge Files</Button>
            </ButtonContainer>
        </ProjectPageContainer>
    );
};

export default ProjectPage;
