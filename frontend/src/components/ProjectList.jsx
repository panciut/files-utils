// frontend/src/components/ProjectList.jsx

import React, { useEffect, useState } from 'react';
import { fetchProjects, removeProject } from '../services/api';
import {
    ProjectListContainer,
    ProjectListHeading,
    ProjectItemContainer,
    ProjectItemLink,
    ProjectItemText,
    DeleteButton
} from './ProjectList.styles';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            const data = await fetchProjects();
            setProjects(data.projects);
        };
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

    return (
        <ProjectListContainer>
            <ProjectListHeading>Projects</ProjectListHeading>
            {projects.map((project) => (
                <ProjectItemContainer key={project}>
                    <ProjectItemLink to={`/project/${project}`}>
                        <ProjectItemText>{project}</ProjectItemText>
                    </ProjectItemLink>
                    <DeleteButton onClick={(event) => handleDelete(project, event)}>Delete</DeleteButton>
                </ProjectItemContainer>
            ))}
        </ProjectListContainer>
    );
};

export default ProjectList;
