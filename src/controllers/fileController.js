// src/controllers/fileController.js

const path = require("path");
const { addFilePaths, getFilePaths } = require("../utils/fileStorage");
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

module.exports = { addFilePathsController, mergeFilesController };
