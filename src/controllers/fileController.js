// src/controllers/fileController.js

const path = require("path");
const mergeFiles = require("../utils/fileMerger");

/**
 * Controller to handle merging of files.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const mergeFilesController = (req, res) => {
  const { projectName, filePaths } = req.body;
  const baseDir = process.env.PROJECTS_BASE_PATH || "./projects";

  const outputFilePath = mergeFiles(filePaths, projectName, baseDir);

  res.status(200).json({
    message: `Files have been merged into ${outputFilePath}`,
    outputFilePath,
  });
};

module.exports = { mergeFilesController };
