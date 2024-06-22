//frontend/src/pages/CreateProjectPage.jsx

import React, { useState } from 'react';
import { createProject } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateProjectPage = () => {
    const [projectName, setProjectName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(projectName);
            alert(`Project ${projectName} created successfully!`);
            navigate('/');
        } catch (error) {
            alert('Failed to create project.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateProjectPage;
