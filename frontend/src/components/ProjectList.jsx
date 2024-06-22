//frontend/src/components/ProjectList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../services/api';
import {
    ProjectListContainer,
    ProjectListHeading,
    ProjectListItem
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

    return (
        <ProjectListContainer>
            <ProjectListHeading>Projects</ProjectListHeading>
            <ul>
                {projects.map((project) => (
                    <ProjectListItem key={project}>
                        <Link to={`/project/${project}`}>{project}</Link>
                    </ProjectListItem>
                ))}
            </ul>
        </ProjectListContainer>
    );
};

export default ProjectList;
