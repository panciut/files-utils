//frontend/src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li><Link to="/create-project">Create Project</Link></li>
                    <li><Link to="/projects">Select Project</Link></li>
                    <li><Link to="/options">Options (Not Implemented)</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
