// src/controllers/treeController.js

const fs = require("fs");
const path = require("path");

const baseDir = process.env.PROJECTS_BASE_PATH;

/**
 * Controller to get the list of tree files for a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getTreeFilesController = (req, res) => {
  const projectName = req.params.projectName;
  const projectDir = path.join(baseDir, projectName, "trees");

  if (!fs.existsSync(projectDir)) {
    return res.status(404).json({
      message: `Trees directory not found for project ${projectName}`,
    });
  }

  const treeFiles = fs
    .readdirSync(projectDir)
    .filter((file) => file.endsWith(".tree.md"));
  res
    .status(200)
    .json({ message: `Tree files for project ${projectName}`, treeFiles });
};

/**
 * Controller to get the content of a specific tree file.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getTreeFileContentController = (req, res) => {
  const projectName = req.params.projectName;
  const treeFileName = req.params.treeFileName;
  const treeFilePath = path.join(baseDir, projectName, "trees", treeFileName);

  if (!fs.existsSync(treeFilePath)) {
    return res.status(404).json({
      message: `Tree file ${treeFileName} not found for project ${projectName}`,
    });
  }

  const content = fs.readFileSync(treeFilePath, "utf-8");
  res.status(200).send(content);
};

module.exports = {
  getTreeFilesController,
  getTreeFileContentController,
};
