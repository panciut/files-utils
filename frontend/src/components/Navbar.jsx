//frontend/src/components/Navbar.jsx

import React from 'react';
import NavbarItem from './NavbarItem';
import { NavbarContainer } from './Navbar.styles';

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavbarItem to="/">Home</NavbarItem>
            <NavbarItem to="/create-project">Create Project</NavbarItem>
            <NavbarItem to="/projects">Projects</NavbarItem>
        </NavbarContainer>
    );
};

export default Navbar;
