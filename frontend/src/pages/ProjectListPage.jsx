// frontend/src/pages/ProjectListPage.jsx

import React from 'react';
import ProjectList from '../components/ProjectList';
import {
    ProjectListPageContainer
} from './ProjectListPage.styles';

const ProjectListPage = () => {
    return (
        <ProjectListPageContainer>
            <ProjectList />
        </ProjectListPageContainer>
    );
};

export default ProjectListPage;
