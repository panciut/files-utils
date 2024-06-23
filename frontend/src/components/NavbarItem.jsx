// frontend/src/components/NavbarItem.jsx

import React from 'react';
import { NavLink } from './Navbar.styles';
import { Link } from 'react-router-dom';

const NavbarItem = ({ to, children }) => {
    return (
        <NavLink as={Link} to={to}>
            {children}
        </NavLink>
    );
};

export default NavbarItem;
