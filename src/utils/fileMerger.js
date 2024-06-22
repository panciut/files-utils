// src/utils/fileMerger.js

const fs = require("fs");
const path = require("path");

/**
 * Merges multiple files into a single markdown file with comments indicating the original file paths.
 * @param {string[]} filePaths - Array of absolute paths to the files to be merged.
 * @param {string} projectName - Name of the project.
 * @param {string} baseDir - Base directory for the projects.
 * @param {string} outputFileName - Name of the output file.
 * @returns {string} - The output file path.
 */
function mergeFiles(
  filePaths,
  projectName,
  baseDir,
  outputFileName = "output.md"
) {
  const outputDir = path.join(baseDir, projectName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputFilePath = path.join(outputDir, outputFileName);

  const writeStream = fs.createWriteStream(outputFilePath);

  filePaths.forEach((filePath, index) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const comment = `<!-- ${filePath} -->\n\n`;

    if (index > 0) {
      writeStream.write("\n\n");
    }

    writeStream.write(comment + fileContent);
  });

  writeStream.end();

  return outputFilePath;
}

module.exports = mergeFiles;
