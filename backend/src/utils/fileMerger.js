// src/utils/fileMerger.js

const fs = require("fs");
const path = require("path");
const { loadProjectConfig } = require("./config");
const { countTokens } = require("./tokenizer");

/**
 * Adds a file path to the directory tree structure.
 * @param {Object} tree - The directory tree structure.
 * @param {string} filePath - The file path to add.
 */
function addToTree(tree, filePath) {
  const parts = filePath.split(path.sep);
  let current = tree;
  for (const part of parts) {
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
}

/**
 * Converts a directory tree structure to a formatted string.
 * @param {Object} tree - The directory tree structure.
 * @param {string} indent - The indentation string.
 * @returns {string} - The formatted directory tree.
 */
function treeToString(tree, indent = "") {
  let result = "";
  for (const key in tree) {
    result += `${indent}${key}\n`;
    result += treeToString(tree[key], indent + "  ");
  }
  return result;
}

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
  const treesDir = path.join(projectDir, "trees");

  // Ensure the output and trees directories exist and are empty
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      fs.unlinkSync(path.join(outputDir, file));
    });
  } else {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!fs.existsSync(treesDir)) {
    fs.mkdirSync(treesDir, { recursive: true });
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
      const tree = {};

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
        const matchesIncludeFileTypes =
          includeFileTypes.length === 0 ||
          includeFileTypes.some((type) => filePath.endsWith(type));
        const matchesExcludeFileTypes = excludeFileTypes.some((type) =>
          filePath.endsWith(type)
        );

        if (
          fs.statSync(filePath).isFile() &&
          (matchesIncludePaths || matchesIncludeFiles) &&
          !matchesExcludeFiles &&
          matchesIncludeFileTypes &&
          !matchesExcludeFileTypes &&
          !excludeDirectories.some((dir) => fileDir.includes(dir))
        ) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const tokenCount = countTokens(fileContent);
          const comment = `# ${filePath} (Tokens: ${tokenCount})\n\n`;
          writeStream.write(comment + fileContent + "\n\n");
          addToTree(tree, filePath);
        }
      });

      writeStream.end();

      // Save the directory tree to a file
      const treeFilePath = path.join(
        treesDir,
        `${name.replace(".md", ".tree.md")}`
      );
      fs.writeFileSync(treeFilePath, treeToString(tree));
    }
  );
}

module.exports = mergeFiles;
