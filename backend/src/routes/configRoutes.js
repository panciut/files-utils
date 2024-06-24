// src/routes/configRoutes.js

const express = require("express");
const {
  getConfigController,
  updateConfigController,
} = require("../controllers/configController");

const router = express.Router();

router.get("/:projectName/config", getConfigController); // Get project config
router.put("/:projectName/config", updateConfigController); // Update project config

module.exports = router;
