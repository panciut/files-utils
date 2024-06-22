// /frontend/src/pages/ProjectPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, getProjectFiles, mergeFiles, addFilePaths, removeFilePaths } from '../services/api';

const ProjectPage = () => {
    const { projectName } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectFiles, setProjectFiles] = useState([]);
    const [filePaths, setFilePaths] = useState('');
    const [removePaths, setRemovePaths] = useState('');
    const [invalidFilePaths, setInvalidFilePaths] = useState([]);

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
            alert('Files added successfully');
            setFilePaths('');
            setInvalidFilePaths(data.invalidFilePaths);
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
        <div>
            <h1>Project: {projectName}</h1>
            {projectDetails && (
                <div>
                    <p>Number of Files: {projectDetails.project.numberOfFiles}</p>
                    <p>Total Size: {projectDetails.project.size} bytes</p>
                </div>
            )}
            <div>
                <h2>Files</h2>
                <ul>
                    {projectFiles.map((filePath) => (
                        <li key={filePath}>{filePath}</li>
                    ))}
                </ul>
            </div>
            <button onClick={handleMergeFiles}>Merge Files</button>
            <div>
                <h2>Add Files</h2>
                <input
                    type="text"
                    value={filePaths}
                    onChange={(e) => setFilePaths(e.target.value)}
                    placeholder="Comma separated file paths"
                />
                <button onClick={handleAddFiles}>Add Files</button>
                {invalidFilePaths.length > 0 && (
                    <div>
                        <h3>Invalid File Paths:</h3>
                        <ul>
                            {invalidFilePaths.map((filePath) => (
                                <li key={filePath}>{filePath}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <h2>Remove Files</h2>
                <input
                    type="text"
                    value={removePaths}
                    onChange={(e) => setRemovePaths(e.target.value)}
                    placeholder="Comma separated file paths"
                />
                <button onClick={handleRemoveFiles}>Remove Files</button>
            </div>
        </div>
    );
};

export default ProjectPage;
