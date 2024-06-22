// frontend/src/pages/ProjectListPage.jsx

import React from 'react';
import ProjectList from '../components/ProjectList';
import {
    ProjectListPageContainer,
    ProjectListPageHeading
} from './ProjectListPage.styles';

const ProjectListPage = () => {
    return (
        <ProjectListPageContainer>
            <ProjectListPageHeading>Project List Page</ProjectListPageHeading>
            <ProjectList />
        </ProjectListPageContainer>
    );
};

export default ProjectListPage;
