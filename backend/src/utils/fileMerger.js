// src/utils/fileMerger.js

const fs = require("fs");
const path = require("path");
const { loadProjectConfig } = require("./config");

/**
 * Merges files for a project based on its configuration and paths.json.
 * @param {string} projectName - Name of the project.
 * @param {string} baseDir - Base directory for the projects.
 */
function mergeFiles(projectName, baseDir) {
  const projectDir = path.join(baseDir, projectName);
  const config = loadProjectConfig(projectDir);
  const { outputDirectory, outputFiles } = config;

  const pathsFilePath = path.join(projectDir, "paths.json");
  const allFilePaths = JSON.parse(fs.readFileSync(pathsFilePath, "utf-8"));

  const outputDir = path.join(projectDir, outputDirectory);

  // Ensure the output directory exists and is empty
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      fs.unlinkSync(path.join(outputDir, file));
    });
  } else {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  outputFiles.forEach(
    ({
      name,
      includePaths,
      includeFiles = [],
      excludeFiles = [],
      includeFileTypes = [],
      excludeFileTypes = [],
      excludeDirectories = [],
    }) => {
      // Ensure all path-related and type-related fields are arrays
      includePaths = Array.isArray(includePaths)
        ? includePaths
        : [includePaths];
      includeFileTypes = Array.isArray(includeFileTypes)
        ? includeFileTypes
        : [includeFileTypes];
      excludeFileTypes = Array.isArray(excludeFileTypes)
        ? excludeFileTypes
        : [excludeFileTypes];
      excludeDirectories = Array.isArray(excludeDirectories)
        ? excludeDirectories
        : [excludeDirectories];

      // Filter out empty strings from arrays
      includeFileTypes = includeFileTypes.filter(Boolean);
      excludeFileTypes = excludeFileTypes.filter(Boolean);
      excludeDirectories = excludeDirectories.filter(Boolean);

      // If includePaths is empty, include all paths
      if (includePaths.length === 0) {
        includePaths = allFilePaths;
      }

      const outputFilePath = path.join(outputDir, name);

      const writeStream = fs.createWriteStream(outputFilePath);

      allFilePaths.forEach((filePath) => {
        const fileDir = path.dirname(filePath);
        const fileExt = path.extname(filePath);

        const matchesIncludePaths = includePaths.some((includePath) =>
          filePath.startsWith(includePath)
        );
        const matchesIncludeFiles = includeFiles.includes(filePath);
        const matchesExcludeFiles = excludeFiles.includes(filePath);

        if (
          fs.statSync(filePath).isFile() &&
          (matchesIncludePaths || matchesIncludeFiles) &&
          !matchesExcludeFiles &&
          (includeFileTypes.length === 0 ||
            includeFileTypes.includes(fileExt)) &&
          !excludeFileTypes.includes(fileExt) &&
          !excludeDirectories.some((dir) => fileDir.includes(dir))
        ) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const comment = `# ${filePath}\n\n`;
          writeStream.write(comment + fileContent + "\n\n");
        }
      });

      writeStream.end();
    }
  );
}

module.exports = mergeFiles;
