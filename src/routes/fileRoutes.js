// src/routes/fileRoutes.js

const express = require("express");
const {
  addFilePathsController,
  removeFilePathsController,
  createProjectController,
  removeProjectController,
  mergeFilesController,
  getAllFilesController,
} = require("../controllers/fileController");

const router = express.Router();

router.post("/create-project", createProjectController);
router.post("/add-file-paths", addFilePathsController);
router.post("/remove-file-paths", removeFilePathsController);
router.post("/remove-project", removeProjectController);
router.post("/merge-files", mergeFilesController);
router.post("/get-all-files", getAllFilesController);

module.exports = router;
