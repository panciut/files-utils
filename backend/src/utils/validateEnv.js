// src/utils/validateEnv.js

function validateEnv() {
  const requiredVars = ["PROJECTS_BASE_PATH", "PORT"];
  const missingVars = requiredVars.filter((key) => !process.env[key]);

  if (missingVars.length) {
    console.error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1);
  }
}

module.exports = validateEnv;
