// src/cli/mergeFilesCli.js

require("dotenv").config();
const path = require("path");
const { getFilePaths } = require("../utils/fileStorage");
const mergeFiles = require("../utils/fileMerger");

const baseDir = process.env.PROJECTS_BASE_PATH || "./projects";

const projectName = process.argv[2];

if (!projectName) {
  console.error("Error: Project name is required.");
  process.exit(1);
}

try {
  const filePaths = getFilePaths(projectName, baseDir);
  if (filePaths.length === 0) {
    console.error(`Error: No file paths found for project ${projectName}.`);
    process.exit(1);
  }
  const outputFilePath = mergeFiles(filePaths, projectName, baseDir);
  console.log(`Files have been merged into ${outputFilePath}`);
} catch (error) {
  console.error(`Error: Failed to merge files for project ${projectName}.`);
  console.error(error.message);
  process.exit(1);
}
