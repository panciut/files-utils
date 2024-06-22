// src/utils/fileStorage.js

const fs = require("fs");
const path = require("path");

/**
 * Adds file paths to the project's paths.json.
 * @param {string} projectName - Name of the project.
 * @param {string[]} filePaths - Array of absolute paths to the files.
 * @param {string} baseDir - Base directory for the projects.
 */
function addFilePaths(projectName, filePaths, baseDir) {
  const projectDir = path.join(baseDir, projectName);
  const pathsFilePath = path.join(projectDir, "paths.json");

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  let paths = [];
  if (fs.existsSync(pathsFilePath)) {
    paths = JSON.parse(fs.readFileSync(pathsFilePath, "utf-8"));
  }

  paths.push(...filePaths);
  fs.writeFileSync(pathsFilePath, JSON.stringify(paths, null, 2));
}

/**
 * Removes file paths from the project's paths.json.
 * @param {string} projectName - Name of the project.
 * @param {string[]} filePaths - Array of absolute paths to be removed.
 * @param {string} baseDir - Base directory for the projects.
 */
function removeFilePaths(projectName, filePaths, baseDir) {
  const projectDir = path.join(baseDir, projectName);
  const pathsFilePath = path.join(projectDir, "paths.json");

  if (fs.existsSync(pathsFilePath)) {
    let paths = JSON.parse(fs.readFileSync(pathsFilePath, "utf-8"));
    paths = paths.filter((p) => !filePaths.includes(p));
    fs.writeFileSync(pathsFilePath, JSON.stringify(paths, null, 2));
  }
}

/**
 * Creates a new project directory.
 * @param {string} projectName - Name of the project.
 * @param {string} baseDir - Base directory for the projects.
 */
function createProject(projectName, baseDir) {
  const projectDir = path.join(baseDir, projectName);

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }
}

/**
 * Removes the project directory.
 * @param {string} projectName - Name of the project.
 * @param {string} baseDir - Base directory for the projects.
 */
function removeProject(projectName, baseDir) {
  const projectDir = path.join(baseDir, projectName);

  if (fs.existsSync(projectDir)) {
    fs.rmSync(projectDir, { recursive: true, force: true });
  }
}

/**
 * Retrieves the file paths for a project from paths.json.
 * @param {string} projectName - Name of the project.
 * @param {string} baseDir - Base directory for the projects.
 * @returns {string[]} - Array of file paths.
 */
function getFilePaths(projectName, baseDir) {
  const projectDir = path.join(baseDir, projectName);
  const pathsFilePath = path.join(projectDir, "paths.json");

  if (fs.existsSync(pathsFilePath)) {
    return JSON.parse(fs.readFileSync(pathsFilePath, "utf-8"));
  }

  return [];
}

module.exports = {
  addFilePaths,
  removeFilePaths,
  createProject,
  removeProject,
  getFilePaths,
};
