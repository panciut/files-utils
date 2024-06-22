// src/utils/validateEnv.js

const requiredEnvVariables = ["PROJECTS_BASE_PATH", "PORT"];

function validateEnv() {
  requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
      console.error(`Error: Missing required environment variable ${variable}`);
      process.exit(1);
    }
  });
}

module.exports = validateEnv;
