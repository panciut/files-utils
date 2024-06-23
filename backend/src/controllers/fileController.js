// src/controllers/fileController.js

const fs = require("fs");
const path = require("path");
const {
  addFilePaths,
  removeFilePaths,
  createProject,
  removeProject,
  getFilePaths,
} = require("../utils/fileStorage");
const mergeFiles = require("../utils/fileMerger");

const baseDir = process.env.PROJECTS_BASE_PATH;

/**
 * Controller to handle adding file paths to a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const addFilePathsController = (req, res) => {
  const projectName = req.params.projectName;
  const { filePaths } = req.body;
  console.log(filePaths);

  if (!Array.isArray(filePaths) || !filePaths.length) {
    return res
      .status(400)
      .json({ message: "filePaths should be a non-empty array" });
  }

  try {
    const { message, addedPaths, invalidFilePaths } = addFilePaths(
      projectName,
      filePaths,
      baseDir
    );
    res.status(200).json({
      message,
      addedPaths,
      invalidFilePaths,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add file paths", error: error.message });
  }
};

/**
 * Controller to handle removing file paths from a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const removeFilePathsController = (req, res) => {
  const projectName = req.params.projectName;
  const { filePaths } = req.body;

  if (!Array.isArray(filePaths) || !filePaths.length) {
    return res
      .status(400)
      .json({ message: "filePaths should be a non-empty array" });
  }

  try {
    removeFilePaths(projectName, filePaths, baseDir);
    res
      .status(200)
      .json({ message: `File paths removed from project ${projectName}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove file paths", error: error.message });
  }
};

/**
 * Controller to handle creating a new project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createProjectController = (req, res) => {
  const { projectName } = req.body;

  try {
    const exists = createProject(projectName, baseDir);
    if (exists) {
      return res.status(200).json({
        message: `Project ${projectName} already exists`,
        warning: true,
      });
    }
    res
      .status(200)
      .json({ message: `Project ${projectName} created successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
  }
};

/**
 * Controller to handle removing a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const removeProjectController = (req, res) => {
  const projectName = req.params.projectName;

  try {
    removeProject(projectName, baseDir);
    res
      .status(200)
      .json({ message: `Project ${projectName} removed successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove project", error: error.message });
  }
};

/**
 * Controller to handle merging of files for a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const mergeFilesController = (req, res) => {
  const projectName = req.params.projectName;
  const { outputFileName = "output.md" } = req.body;

  try {
    const filePaths = getFilePaths(projectName, baseDir);
    const outputFilePath = mergeFiles(
      filePaths,
      projectName,
      baseDir,
      outputFileName
    );
    res.status(200).json({
      message: `Files have been merged into ${outputFilePath}`,
      outputFilePath,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to merge files", error: error.message });
  }
};

/**
 * Controller to get all file paths in a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllFilesController = (req, res) => {
  const projectName = req.params.projectName;

  try {
    const filePaths = getFilePaths(projectName, baseDir);
    res.status(200).json({
      message: `File paths for project ${projectName}`,
      filePaths,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get file paths", error: error.message });
  }
};

/**
 * Controller to get a specific output file of a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getOutputFileController = (req, res) => {
  const projectName = req.params.projectName;
  const outputFileName = req.params.outputFileName;

  try {
    const outputFilePath = path.join(baseDir, projectName, outputFileName);
    if (!fs.existsSync(outputFilePath)) {
      return res.status(404).json({
        message: `Output file ${outputFileName} not found for project ${projectName}`,
      });
    }
    res.sendFile(path.resolve(outputFilePath));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get output file", error: error.message });
  }
};

/**
 * Controller to get all output files of a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllOutputFilesController = (req, res) => {
  const projectName = req.params.projectName;

  try {
    const projectDir = path.join(baseDir, projectName);
    if (!fs.existsSync(projectDir)) {
      return res
        .status(404)
        .json({ message: `Project ${projectName} not found` });
    }
    const files = fs
      .readdirSync(projectDir)
      .filter((file) => file.endsWith(".md"));
    res.status(200).json({
      message: `Output files for project ${projectName}`,
      files,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get output files", error: error.message });
  }
};

/**
 * Controller to get all projects.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllProjectsController = (req, res) => {
  try {
    const projects = fs.readdirSync(baseDir).filter((project) => {
      const projectPath = path.join(baseDir, project);
      return fs.statSync(projectPath).isDirectory();
    });
    res.status(200).json({
      message: "All projects",
      projects,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get projects", error: error.message });
  }
};

/**
 * Controller to get project details.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getProjectDetailsController = (req, res) => {
  const projectName = req.params.projectName;

  try {
    const projectDir = path.join(baseDir, projectName);
    if (!fs.existsSync(projectDir)) {
      return res
        .status(404)
        .json({ message: `Project ${projectName} not found` });
    }
    const filePaths = getFilePaths(projectName, baseDir);
    const size = filePaths.reduce((total, filePath) => {
      return total + fs.statSync(filePath).size;
    }, 0);
    res.status(200).json({
      message: `Details for project ${projectName}`,
      project: {
        name: projectName,
        numberOfFiles: filePaths.length,
        size,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get project details", error: error.message });
  }
};

module.exports = {
  addFilePathsController,
  removeFilePathsController,
  createProjectController,
  removeProjectController,
  mergeFilesController,
  getAllFilesController,
  getOutputFileController,
  getAllOutputFilesController,
  getAllProjectsController,
  getProjectDetailsController,
};
