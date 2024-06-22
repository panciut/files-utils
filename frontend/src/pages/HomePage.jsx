// frontend/src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
    HomePageContainer,
    HomePageHeading,
    Nav,
    NavList,
    Section,
    SectionTitle,
    SectionContent
} from './HomePage.styles';

const HomePage = () => {
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
        </HomePageContainer>
    );
};

export default HomePage;
