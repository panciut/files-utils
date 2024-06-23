// frontend/src/pages/ProjectPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, getProjectFiles, mergeFiles, addFilePaths, removeFilePaths } from '../services/api';
import FilesList from '../components/FilesList';  // Import the new FilesList component
import {
    ProjectPageContainer,
    ProjectPageHeading,
    CollapsibleSection,
    SectionTitle,
    SectionContent,
    ButtonContainer,
    Button,
    InputContainer
} from './ProjectPage.styles';

const ProjectPage = () => {
    const { projectName } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectFiles, setProjectFiles] = useState([]);
    const [removePaths, setRemovePaths] = useState('');
    const [isDetailsCollapsed, setIsDetailsCollapsed] = useState(false);
    const [isFilesCollapsed, setIsFilesCollapsed] = useState(true);
    const [isAddRemoveCollapsed, setIsAddRemoveCollapsed] = useState(true);
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
                setProjectFiles(prevFiles => [...prevFiles, ...data.addedPaths]);
            }
        } catch (error) {
            console.error('Failed to add files', error);
        }
    };

    const handleRemoveFiles = async () => {
        try {
            await removeFilePaths(projectName, removePaths.split(','));
            alert('Files removed successfully');
            setRemovePaths('');
            setProjectFiles(prevFiles => prevFiles.filter(file => !removePaths.split(',').includes(file)));
        } catch (error) {
            console.error('Failed to remove files', error);
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
                <SectionTitle onClick={() => setIsFilesCollapsed(!isFilesCollapsed)}>
                    Files
                </SectionTitle>
                <SectionContent isCollapsed={isFilesCollapsed}>
                    <FilesList files={projectFiles} /> {/* Use FilesList component */}
                </SectionContent>
            </CollapsibleSection>
            <ButtonContainer>
                <Button onClick={handleMergeFiles}>Merge Files</Button>
            </ButtonContainer>
            <CollapsibleSection>
                <SectionTitle onClick={() => setIsAddRemoveCollapsed(!isAddRemoveCollapsed)}>
                    Add/Remove Files
                </SectionTitle>
                <SectionContent isCollapsed={isAddRemoveCollapsed}>
                    <InputContainer>
                        <h2>Add Files</h2>
                        <ButtonContainer>
                            <Button onClick={handleFileSelection}>Select Files</Button>
                        </ButtonContainer>
                        {selectedFiles.length > 0 && (
                            <ul>
                                {selectedFiles.map((filePath, index) => (
                                    <li key={index}>{filePath}</li>
                                ))}
                            </ul>
                        )}
                        <ButtonContainer>
                            <Button onClick={handleAddFiles}>Add Files</Button>
                        </ButtonContainer>
                    </InputContainer>
                    <InputContainer>
                        <h2>Remove Files</h2>
                        <input
                            type="text"
                            value={removePaths}
                            onChange={(e) => setRemovePaths(e.target.value)}
                            placeholder="Comma separated file paths"
                        />
                        <ButtonContainer>
                            <Button onClick={handleRemoveFiles}>Remove Files</Button>
                        </ButtonContainer>
                    </InputContainer>
                </SectionContent>
            </CollapsibleSection>
        </ProjectPageContainer>
    );
};

export default ProjectPage;
