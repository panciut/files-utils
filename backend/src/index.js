// /Users/panciut/files-utils/backend/src/index.js

require("dotenv").config();
const validateEnv = require("./utils/validateEnv");
const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");

validateEnv();

const app = express();
const PORT = process.env.PORT;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use("/api", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
