// frontend/src/pages/HomePage.jsx

import React from 'react';
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
            <HomePageHeading>Files Utilities App</HomePageHeading>
            <Nav>
                <NavList>
                    <li>
                        <Section to="/projects">
                            <SectionTitle>
                                Select Project
                            </SectionTitle>
                            <SectionContent>Select an existing project.</SectionContent>
                        </Section>
                    </li>
                </NavList>
            </Nav>
        </HomePageContainer>
    );
};

export default HomePage;
