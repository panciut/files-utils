// frontend/src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../services/api';
import {
    HomePageContainer,
    HomePageHeading,
    Nav,
    NavList,
    Section,
    SectionTitle,
    SectionContent,
    ProjectListContainer,
    ProjectListHeading,
    ProjectListItem,
} from './HomePage.styles';

const HomePage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            const data = await fetchProjects();
            setProjects(data.projects);
        };
        loadProjects();
    }, []);

    return (
        <HomePageContainer>
            <HomePageHeading>Home Page</HomePageHeading>
            <Nav>
                <NavList>
                    <li>
                        <Section>
                            <SectionTitle>
                                <Link to="/create-project">Create Project</Link>
                            </SectionTitle>
                            <SectionContent>Create a new project.</SectionContent>
                        </Section>
                    </li>
                    <li>
                        <Section>
                            <SectionTitle>
                                <Link to="/projects">Select Project</Link>
                            </SectionTitle>
                            <SectionContent>Select an existing project.</SectionContent>
                        </Section>
                    </li>
                    <li>
                        <Section>
                            <SectionTitle>
                                <Link to="/options">Options</Link>
                            </SectionTitle>
                            <SectionContent>Various options (Not Implemented).</SectionContent>
                        </Section>
                    </li>
                </NavList>
            </Nav>
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
        </HomePageContainer>
    );
};

export default HomePage;
