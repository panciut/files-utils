// frontend/src/components/ProjectList.jsx

import React, { useEffect, useState } from 'react';
import { fetchProjects, createProject, removeProject } from '../services/api';
import CreateProjectModal from './CreateProjectModal';
import {
    ProjectListContainer,
    ProjectListHeading,
    ProjectItemContainer,
    ProjectItemLink,
    ProjectItemText,
    DeleteButton,
    AddButton
} from './ProjectList.styles';
import addIcon from '../assets/add.svg';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadProjects = async () => {
        const data = await fetchProjects();
        setProjects(data.projects);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleDelete = async (projectName, event) => {
        event.stopPropagation();
        const confirmed = window.confirm(`Are you sure you want to delete the project "${projectName}"?`);
        if (confirmed) {
            try {
                await removeProject(projectName);
                setProjects(projects.filter(project => project !== projectName));
            } catch (error) {
                console.error('Failed to delete project', error);
            }
        }
    };

    const handleCreateProject = async (projectName) => {
        try {
            await createProject(projectName);
            loadProjects(); // Refresh the project list
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error('Failed to create project', error);
        }
    };

    return (
        <ProjectListContainer>
            <ProjectListHeading>
                Projects
                <AddButton onClick={() => setIsModalOpen(true)}>
                    <img src={addIcon} alt="Add" />
                </AddButton>
            </ProjectListHeading>
            {projects.map((project) => (
                <ProjectItemContainer key={project}>
                    <ProjectItemLink to={`/project/${project}`}>
                        <ProjectItemText>{project}</ProjectItemText>
                    </ProjectItemLink>
                    <DeleteButton onClick={(event) => handleDelete(project, event)}>Delete</DeleteButton>
                </ProjectItemContainer>
            ))}
            {isModalOpen && (
                <CreateProjectModal onClose={() => setIsModalOpen(false)} onCreate={handleCreateProject} />
            )}
        </ProjectListContainer>
    );
};

export default ProjectList;
