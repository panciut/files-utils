### Configuration File (`config.json`)

The `config.json` file allows you to define how files should be processed and merged within a project. This configuration file is located in the root directory of each project.

### Configuration Structure

```json
{
  "outputDirectory": "output",
  "outputFiles": [
    {
      "name": "output-file-name",
      "includePaths": ["path/to/include"],
      "includeFiles": ["path/to/specific/file1", "path/to/specific/file2"],
      "excludeFiles": ["path/to/exclude/file1", "path/to/exclude/file2"],
      "includeFileTypes": [".filetype1", ".filetype2"],
      "excludeFileTypes": [".filetype1", ".filetype2"],
      "excludeDirectories": [
        "path/to/exclude/directory1",
        "path/to/exclude/directory2"
      ]
    }
  ],
  "maxClipboardLines": 3000
}
```

### Configuration Fields

#### `outputDirectory` (string)

- **Description**: Specifies the directory where the merged output files will be saved.
- **Example**: `"output"`

#### `outputFiles` (array of objects)

- **Description**: An array where each object defines the settings for an individual output file.
- **Fields**:
  - **`name`** (string): The name of the output file.
    - **Example**: `"frontend.output.md"`
  - **`includePaths`** (array of strings): Paths to include files from. Only files listed in `paths.json` and within these paths will be considered.
    - **Example**: `["/Users/panciut/projects/test/frontend/"]`
  - **`includeFiles`** (array of strings): Specific files to include, ensuring they are present in `paths.json`.
    - **Example**: `["/Users/panciut/projects/test/frontend/special.js"]`
  - **`excludeFiles`** (array of strings): Specific files to exclude, ensuring they are present in `paths.json`.
    - **Example**: `["/Users/panciut/projects/test/frontend/exclude.js"]`
  - **`includeFileTypes`** (array of strings): File types to include based on their extension.
    - **Example**: `[".js", ".jsx"]`
  - **`excludeFileTypes`** (array of strings): File types to exclude based on their extension.
    - **Example**: `[".test.js"]`
  - **`excludeDirectories`** (array of strings): Directories to exclude files from.
    - **Example**: `["node_modules"]`

#### `maxClipboardLines` (integer)

- **Description**: The maximum number of lines that can be copied to the clipboard at one time.
- **Example**: `3000`

### Example Configuration

Here is an example `config.json` for a project named `test`:

```json
{
  "outputDirectory": "output",
  "outputFiles": [
    {
      "name": "frontend.output.md",
      "includePaths": ["/Users/panciut/projects/test/frontend/"],
      "includeFiles": ["/Users/panciut/projects/test/frontend/special.js"],
      "excludeFiles": ["/Users/panciut/projects/test/frontend/exclude.js"],
      "includeFileTypes": [".js", ".jsx"],
      "excludeFileTypes": [".test.js"],
      "excludeDirectories": ["node_modules"]
    },
    {
      "name": "backend.output.md",
      "includePaths": ["/Users/panciut/projects/test/backend/"],
      "includeFiles": [],
      "excludeFiles": [],
      "includeFileTypes": [".js"],
      "excludeFileTypes": [".test.js"],
      "excludeDirectories": ["node_modules"]
    }
  ],
  "maxClipboardLines": 3000
}
```

### How the Configuration Works

1. **Load Project Configuration**:

   - The configuration is loaded from `config.json` in the project's root directory.

2. **Process Paths**:

   - The files to be included in the output are determined based on `paths.json` and the filters specified in `config.json`.

3. **Merge Files**:

   - Files that match the `includePaths` and are not excluded by `excludeFiles` or `excludeDirectories` are included.
   - Files that match `includeFileTypes` and do not match `excludeFileTypes` are included.

4. **Output**:
   - The processed files are merged and saved into the directory specified by `outputDirectory`.

### Notes

- Ensure that `paths.json` includes all potential files to be merged.
- `includePaths` and `includeFiles` can be used to specifically target certain files or directories.
- `excludeFiles`, `excludeFileTypes`, and `excludeDirectories` help refine the selection by excluding unwanted files.
- The `maxClipboardLines` setting is useful for limiting the amount of data that can be copied at once.
