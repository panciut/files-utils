// src/routes/treeRoutes.js

const express = require("express");
const {
  getTreeFilesController,
  getTreeFileContentController,
} = require("../controllers/treeController");

const router = express.Router();

// Route to get all tree files for a project
router.get("/:projectName/trees", getTreeFilesController);

// Route to get the content of a specific tree file
router.get("/:projectName/tree/:treeFileName", getTreeFileContentController);

module.exports = router;
