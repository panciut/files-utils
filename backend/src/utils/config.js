// src/utils/config.js

const fs = require("fs");
const path = require("path");

/**
 * Loads the project-specific configuration.
 * @param {string} projectDir - Directory of the project.
 * @returns {Object} - The configuration object.
 */
function loadProjectConfig(projectDir) {
  const configPath = path.join(projectDir, "config.json");
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } else {
    throw new Error(`Configuration file not found for project ${projectDir}`);
  }
}

module.exports = {
  loadProjectConfig,
};
