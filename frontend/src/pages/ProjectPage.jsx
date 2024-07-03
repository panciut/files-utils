// frontend/src/pages/ProjectPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getProjectDetails,
    getProjectFiles,
    mergeFiles,
    addFilePaths,
    removeFilePaths,
    getProjectOutputFiles,
    getOutputFileContent,
    getTreeFiles,
    getTreeFileContent
} from '../services/api';
import FilesList from '../components/FilesList';
import OutputFilesList from '../components/OutputFilesList';
import TreeFilesList from '../components/TreeFilesList'; // Import TreeFilesList
import ConfigModal from '../components/ConfigModal'; // Import ConfigModal
import addIcon from '../assets/add.svg';
import infoIcon from '../assets/info.svg';
import settingsIcon from '../assets/settings.svg'; // Ensure you have this asset
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
    const [outputFiles, setOutputFiles] = useState([]);
    const [treeFiles, setTreeFiles] = useState([]); // State for tree files
    const [isFilesCollapsed, setIsFilesCollapsed] = useState(true);
    const [isOutputsCollapsed, setIsOutputsCollapsed] = useState(false);
    const [isTreesCollapsed, setIsTreesCollapsed] = useState(true); // State for tree section collapse
    const [isInfoPopupVisible, setIsInfoPopupVisible] = useState(false);
    const [isConfigModalVisible, setIsConfigModalVisible] = useState(false); // State for ConfigModal visibility

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await getProjectDetails(projectName);
                setProjectDetails(details);
                const files = await getProjectFiles(projectName);
                setProjectFiles(files.filePaths);
                const outputs = await getProjectOutputFiles(projectName);
                setOutputFiles(outputs);
                const trees = await getTreeFiles(projectName); // Fetch tree files
                setTreeFiles(trees);
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
            const outputs = await getProjectOutputFiles(projectName);
            setOutputFiles(outputs); // Update output files state after merging
            const trees = await getTreeFiles(projectName); // Refresh tree files
            setTreeFiles(trees);
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

    const handleCopyContent = (content) => {
        if (content) {
            navigator.clipboard.writeText(content);
            alert('Content copied to clipboard');
        } else {
            alert('No content to copy');
        }
    };

    const handleFileClick = async (fileName) => {
        try {
            const content = await getOutputFileContent(projectName, fileName);
            setOutputFiles(prevFiles =>
                prevFiles.map(file =>
                    file.name === fileName ? { ...file, content } : file
                )
            );
            return content;
        } catch (error) {
            console.error('Failed to fetch file content', error);
        }
    };

    const handleTreeFileClick = async (fileName) => {
        try {
            const content = await getTreeFileContent(projectName, fileName);
            return content;
        } catch (error) {
            console.error('Failed to fetch tree file content', error);
        }
    };

    const toggleInfoPopup = () => {
        setIsInfoPopupVisible(!isInfoPopupVisible);
    };

    const toggleConfigModal = () => {
        setIsConfigModalVisible(!isConfigModalVisible); // Toggle ConfigModal visibility
    };

    return (
        <ProjectPageContainer>
            <ProjectPageHeading>
                Project: {projectName}
                <ProjectInfoButton onClick={toggleInfoPopup}>
                    <img src={infoIcon} alt="Project Info" />
                </ProjectInfoButton>
                <ProjectInfoButton onClick={toggleConfigModal}>
                    <img src={settingsIcon} alt="Settings" />
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
            {isConfigModalVisible && (
                <ConfigModal projectName={projectName} onClose={toggleConfigModal} />
            )}
            <CollapsibleSection>
                <SectionHeader onClick={() => setIsFilesCollapsed(!isFilesCollapsed)}>
                    <SectionTitle>
                        Files
                    </SectionTitle>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleFileSelection(); }}>
                        <img src={addIcon} alt="Add Files" />
                    </IconButton>
                </SectionHeader>
                <SectionContent isCollapsed={isFilesCollapsed}>
                    <FilesList files={projectFiles} onRemoveFile={handleRemoveFile} />
                </SectionContent>
            </CollapsibleSection>
            <CollapsibleSection>
                <SectionHeader onClick={() => setIsOutputsCollapsed(!isOutputsCollapsed)}>
                    <SectionTitle>
                        Output Files
                    </SectionTitle>
                </SectionHeader>
                <SectionContent isCollapsed={isOutputsCollapsed}>
                    <OutputFilesList files={outputFiles} onCopyContent={handleCopyContent} onFileClick={handleFileClick} />
                </SectionContent>
            </CollapsibleSection>
            <CollapsibleSection>
                <SectionHeader onClick={() => setIsTreesCollapsed(!isTreesCollapsed)}>
                    <SectionTitle>
                        Tree Files
                    </SectionTitle>
                </SectionHeader>
                <SectionContent isCollapsed={isTreesCollapsed}>
                    <TreeFilesList files={treeFiles} onCopyContent={handleCopyContent} onFileClick={handleTreeFileClick} />
                </SectionContent>
            </CollapsibleSection>
            <ButtonContainer>
                <Button onClick={handleMergeFiles}>Merge Files</Button>
            </ButtonContainer>
        </ProjectPageContainer>
    );
};

export default ProjectPage;
