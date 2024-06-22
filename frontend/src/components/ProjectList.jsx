//frontend/src/components/ProjectList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../services/api';

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
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project}>
                        <Link to={`/project/${project}`}>{project}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
