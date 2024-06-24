// /Users/panciut/files-utils/backend/src/index.js

require("dotenv").config();
const validateEnv = require("./utils/validateEnv");
const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");
const configRoutes = require("./routes/configRoutes");

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
app.use("/api/projects", fileRoutes); // Use file routes under /projects
app.use("/api", configRoutes); // Use config routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
