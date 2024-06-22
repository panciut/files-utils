//frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectListPage from './pages/ProjectListPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/project/:projectName" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
