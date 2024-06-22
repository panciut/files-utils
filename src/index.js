// src/index.js

require("dotenv").config();
const express = require("express");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
