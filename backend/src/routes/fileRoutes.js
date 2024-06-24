// src/routes/fileRoutes.js

const express = require("express");
const {
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
} = require("../controllers/fileController");

const router = express.Router();

router.post("/", createProjectController); // Create a project
router.put("/:projectName/files", addFilePathsController); // Add file paths to a project
router.delete("/:projectName/files", removeFilePathsController); // Remove file paths from a project
router.delete("/:projectName", removeProjectController); // Remove a project
router.post("/:projectName/merge", mergeFilesController); // Merge files in a project
router.get("/:projectName/files", getAllFilesController); // Get all files in a project
router.get("/:projectName/output/:outputFileName", getOutputFileController); // Get a specific output file of a project
router.get("/:projectName/outputs", getAllOutputFilesController); // Get all output files of a project
router.get("/", getAllProjectsController); // Get all projects
router.get("/:projectName/details", getProjectDetailsController); // Get project details

module.exports = router;
