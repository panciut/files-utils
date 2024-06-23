// src/utils/fileStorage.js

const fs = require("fs");
const path = require("path");
const { loadProjectConfig } = require("./config");

/**
 * Creates a new project directory with an empty paths.json file and a default config.json.
 * @param {string} projectName - Name of the project.
 * @param {string} baseDir - Base directory for the projects.
 * @returns {boolean} - Returns true if the project already exists, false otherwise.
 */
function createProject(projectName, baseDir) {
  const projectDir = path.join(baseDir, projectName);

  if (fs.existsSync(projectDir)) {
    return true;
  }

  fs.mkdirSync(projectDir, { recursive: true });
  const pathsFilePath = path.join(projectDir, "paths.json");
  fs.writeFileSync(pathsFilePath, JSON.stringify([], null, 2));

  const configFilePath = path.join(projectDir, "config.json");
  const defaultConfig = {
    outputDirectory: "output",
    includePaths: [],
    includeFileTypes: [],
    excludeFileTypes: [],
    excludeDirectories: [],
    outputFiles: [],
    maxClipboardLines: 100,
  };
  fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));

  return false;
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

/**
 * Adds file paths to the project's paths.json if they aren't already present and exist.
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

  let existingPaths = [];
  if (fs.existsSync(pathsFilePath)) {
    existingPaths = JSON.parse(fs.readFileSync(pathsFilePath, "utf-8"));
  }

  const validFilePaths = filePaths.filter((filePath) =>
    fs.existsSync(filePath)
  );
  const newPaths = validFilePaths.filter(
    (filePath) => !existingPaths.includes(filePath)
  );
  const updatedPaths = [...existingPaths, ...newPaths].sort();
  fs.writeFileSync(pathsFilePath, JSON.stringify(updatedPaths, null, 2));

  const addedPaths =
    newPaths.length !== validFilePaths.length
      ? "Some or all files already exist in the project or do not exist."
      : "All files added successfully.";

  const invalidFilePaths = filePaths.filter(
    (filePath) => !fs.existsSync(filePath)
  );

  return {
    message: addedPaths,
    addedPaths: newPaths,
    invalidFilePaths,
  };
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
    paths = paths.filter((p) => !filePaths.includes(p)).sort();
    fs.writeFileSync(pathsFilePath, JSON.stringify(paths, null, 2));
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

module.exports = {
  addFilePaths,
  removeFilePaths,
  createProject,
  removeProject,
  getFilePaths,
};
