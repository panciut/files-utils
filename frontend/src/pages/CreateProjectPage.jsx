// frontend/src/pages/CreateProjectPage.jsx

import React, { useState } from 'react';
import { createProject } from '../services/api';
import {
    CreateProjectContainer,
    CreateProjectHeading,
    FormContainer,
    FormInput,
    FormButton
} from './CreateProjectPage.styles';

const CreateProjectPage = () => {
    const [projectName, setProjectName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(projectName);
            alert('Project created successfully');
            setProjectName('');
        } catch (error) {
            console.error('Failed to create project', error);
        }
    };

    return (
        <CreateProjectContainer>
            <CreateProjectHeading>Create Project</CreateProjectHeading>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Project Name"
                        required
                    />
                    <FormButton type="submit">Create Project</FormButton>
                </form>
            </FormContainer>
        </CreateProjectContainer>
    );
};

export default CreateProjectPage;
