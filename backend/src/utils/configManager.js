// src/utils/configManager.js

const fs = require("fs");
const path = require("path");

/**
 * Loads the project configuration from config.json.
 * @param {string} projectDir - Directory of the project.
 * @returns {Object} - The configuration object.
 */
function loadProjectConfig(projectDir) {
  const configFilePath = path.join(projectDir, "config.json");
  if (!fs.existsSync(configFilePath)) {
    throw new Error("Configuration file not found");
  }
  return JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
}

/**
 * Saves the project configuration to config.json.
 * @param {string} projectDir - Directory of the project.
 * @param {Object} config - The configuration object.
 */
function saveProjectConfig(projectDir, config) {
  const configFilePath = path.join(projectDir, "config.json");
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

/**
 * Updates the project configuration with new values.
 * @param {string} projectDir - Directory of the project.
 * @param {Object} updates - The updates to apply to the configuration.
 * @returns {Object} - The updated configuration object.
 */
function updateProjectConfig(projectDir, updates) {
  const config = loadProjectConfig(projectDir);
  const updatedConfig = { ...config, ...updates };
  saveProjectConfig(projectDir, updatedConfig);
  return updatedConfig;
}

module.exports = {
  loadProjectConfig,
  saveProjectConfig,
  updateProjectConfig,
};
