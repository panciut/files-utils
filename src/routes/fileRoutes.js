// src/routes/fileRoutes.js

const express = require("express");
const {
  addFilePathsController,
  removeFilePathsController,
  createProjectController,
  removeProjectController,
  mergeFilesController,
} = require("../controllers/fileController");

const router = express.Router();

router.post("/add-file-paths", addFilePathsController);
router.post("/remove-file-paths", removeFilePathsController);
router.post("/create-project", createProjectController);
router.post("/remove-project", removeProjectController);
router.post("/merge-files", mergeFilesController);

module.exports = router;
