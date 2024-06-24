// src/controllers/configController.js

const path = require("path");
const {
  loadProjectConfig,
  saveProjectConfig,
  updateProjectConfig,
} = require("../utils/configManager");

const baseDir = process.env.PROJECTS_BASE_PATH;

/**
 * Controller to get the configuration of a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getConfigController = (req, res) => {
  const projectName = req.params.projectName;

  try {
    const projectDir = path.join(baseDir, projectName);
    const config = loadProjectConfig(projectDir);
    res.status(200).json(config);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get config", error: error.message });
  }
};

/**
 * Controller to update the configuration of a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateConfigController = (req, res) => {
  const projectName = req.params.projectName;
  const updates = req.body;

  try {
    const projectDir = path.join(baseDir, projectName);
    const updatedConfig = updateProjectConfig(projectDir, updates);
    res.status(200).json(updatedConfig);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update config", error: error.message });
  }
};

module.exports = {
  getConfigController,
  updateConfigController,
};
