// /Users/panciut/files-utils/backend/src/index.js

require("dotenv").config();
const validateEnv = require("./utils/validateEnv");
const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // Import centralized routes

validateEnv();

const app = express();
const PORT = process.env.PORT;

// Use CORS middleware
app.use(cors());

// Print the request method and path
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());
app.use("/api", routes); // Use centralized routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
