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

router.post("/projects", createProjectController); // Create a project
router.put("/projects/:projectName/files", addFilePathsController); // Add file paths to a project
router.delete("/projects/:projectName/files", removeFilePathsController); // Remove file paths from a project
router.delete("/projects/:projectName", removeProjectController); // Remove a project
router.post("/projects/:projectName/merge", mergeFilesController); // Merge files in a project
router.get("/projects/:projectName/files", getAllFilesController); // Get all files in a project
router.get(
  "/projects/:projectName/output/:outputFileName",
  getOutputFileController
); // Get a specific output file of a project
router.get("/projects/:projectName/outputs", getAllOutputFilesController); // Get all output files of a project
router.get("/projects", getAllProjectsController); // Get all projects
router.get("/projects/:projectName/details", getProjectDetailsController); // Get project details

module.exports = router;
