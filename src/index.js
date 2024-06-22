// src/index.js

require("dotenv").config();
const express = require("express");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
const PORT = process.env.PORT || 4554;

app.use(express.json()); // Ensure this middleware is included
app.use("/api", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
