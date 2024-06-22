// src/controllers/fileController.js

const path = require("path");
const {
  addFilePaths,
  removeFilePaths,
  createProject,
  removeProject,
  getFilePaths,
} = require("../utils/fileStorage");
const mergeFiles = require("../utils/fileMerger");

const baseDir = process.env.PROJECTS_BASE_PATH || "./projects";

/**
 * Controller to handle adding file paths to a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const addFilePathsController = (req, res) => {
  const { projectName, filePaths } = req.body;

  if (!Array.isArray(filePaths) || !filePaths.length) {
    return res
      .status(400)
      .json({ message: "filePaths should be a non-empty array" });
  }

  try {
    addFilePaths(projectName, filePaths, baseDir);
    res
      .status(200)
      .json({ message: `File paths added to project ${projectName}` });
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
  const { projectName, filePaths } = req.body;

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
    createProject(projectName, baseDir);
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
  const { projectName } = req.body;

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
  const { projectName } = req.body;

  try {
    const filePaths = getFilePaths(projectName, baseDir);
    const outputFilePath = mergeFiles(filePaths, projectName, baseDir);
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

module.exports = {
  addFilePathsController,
  removeFilePathsController,
  createProjectController,
  removeProjectController,
  mergeFilesController,
};
