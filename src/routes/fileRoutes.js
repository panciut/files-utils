// src/routes/fileRoutes.js

const express = require("express");
const { mergeFilesController } = require("../controllers/fileController");

const router = express.Router();

router.post("/merge-files", mergeFilesController);

module.exports = router;
