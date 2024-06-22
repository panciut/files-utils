// src/routes/fileRoutes.js

const express = require("express");
const {
  addFilePathsController,
  mergeFilesController,
} = require("../controllers/fileController");

const router = express.Router();

router.post("/add-file-paths", addFilePathsController);
router.post("/merge-files", mergeFilesController);

module.exports = router;
