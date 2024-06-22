//frontend/src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarContainer, NavLink } from './Navbar.styles';

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavLink as={Link} to="/">Home</NavLink>
            <NavLink as={Link} to="/create-project">Create Project</NavLink>
            <NavLink as={Link} to="/projects">Projects</NavLink>
        </NavbarContainer>
    );
};

export default Navbar;
