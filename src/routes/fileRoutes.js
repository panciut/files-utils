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

router.post("/create-project", createProjectController);
router.post("/add-file-paths", addFilePathsController);
router.post("/remove-file-paths", removeFilePathsController);
router.post("/remove-project", removeProjectController);
router.post("/merge-files", mergeFilesController);
router.get("/get-all-files", getAllFilesController);
router.get("/get-output-file", getOutputFileController);
router.get("/get-all-output-files", getAllOutputFilesController);
router.get("/get-all-projects", getAllProjectsController);
router.get("/get-project-details", getProjectDetailsController);

module.exports = router;
