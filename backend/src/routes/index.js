// src/routes/index.js

const express = require("express");
const fileRoutes = require("./fileRoutes");
const configRoutes = require("./configRoutes");
const treeRoutes = require("./treeRoutes");

const router = express.Router();

router.use("/projects", fileRoutes); // Routes for project file operations
router.use("/config", configRoutes); // Routes for project configuration
router.use("/trees", treeRoutes); // Routes for directory trees

module.exports = router;
