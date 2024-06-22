// src/cli/createProjectCli.js

require("dotenv").config();
const { createProject } = require("../utils/fileStorage");

const baseDir = process.env.PROJECTS_BASE_PATH;

const projectName = process.argv[2];

if (!projectName) {
  console.error("Error: Project name is required.");
  process.exit(1);
}

try {
  createProject(projectName, baseDir);
  console.log(`Project ${projectName} created successfully`);
} catch (error) {
  console.error(`Error: Failed to create project ${projectName}.`);
  console.error(error.message);
  process.exit(1);
}
