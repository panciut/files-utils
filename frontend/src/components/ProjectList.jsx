import React, { useEffect, useState } from 'react';
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
                    <li key={project}>{project}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
