// /frontend/src/pages/ProjectPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, getProjectFiles, mergeFiles, addFilePaths, removeFilePaths } from '../services/api';
import {
    ProjectPageContainer,
    ProjectPageHeading,
    ProjectDetails,
    FileList,
    Button,
    InputContainer
} from './ProjectPage.styles';

const ProjectPage = () => {
    const { projectName } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectFiles, setProjectFiles] = useState([]);
    const [filePaths, setFilePaths] = useState('');
    const [removePaths, setRemovePaths] = useState('');

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

    const handleAddFiles = async () => {
        try {
            const data = await addFilePaths(projectName, filePaths.split(','));
            if (data.invalidFilePaths.length > 0) {
                alert(`The following files do not exist: ${data.invalidFilePaths.join(', ')}`);
            }
            if (data.addedPaths.length > 0) {
                alert('Files added successfully');
            }
            setFilePaths('');
        } catch (error) {
            console.error('Failed to add files', error);
        }
    };

    const handleRemoveFiles = async () => {
        try {
            await removeFilePaths(projectName, removePaths.split(','));
            alert('Files removed successfully');
            setRemovePaths('');
        } catch (error) {
            console.error('Failed to remove files', error);
        }
    };

    return (
        <ProjectPageContainer>
            <ProjectPageHeading>Project: {projectName}</ProjectPageHeading>
            {projectDetails && (
                <ProjectDetails>
                    <p>Number of Files: {projectDetails.project.numberOfFiles}</p>
                    <p>Total Size: {projectDetails.project.size} bytes</p>
                </ProjectDetails>
            )}
            <div>
                <h2>Files</h2>
                <FileList>
                    {projectFiles.map((filePath) => (
                        <li key={filePath}>{filePath}</li>
                    ))}
                </FileList>
            </div>
            <Button onClick={handleMergeFiles}>Merge Files</Button>
            <InputContainer>
                <h2>Add Files</h2>
                <input
                    type="text"
                    value={filePaths}
                    onChange={(e) => setFilePaths(e.target.value)}
                    placeholder="Comma separated file paths"
                />
                <Button onClick={handleAddFiles}>Add Files</Button>
            </InputContainer>
            <InputContainer>
                <h2>Remove Files</h2>
                <input
                    type="text"
                    value={removePaths}
                    onChange={(e) => setRemovePaths(e.target.value)}
                    placeholder="Comma separated file paths"
                />
                <Button onClick={handleRemoveFiles}>Remove Files</Button>
            </InputContainer>
        </ProjectPageContainer>
    );
};

export default ProjectPage;
