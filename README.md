# files-utils

A Node.js application to merge multiple files into a single markdown file with comments indicating the original file paths.

## Directory Structure

```
files-utils/
│
├── src/
│   ├── controllers/
│   │   └── fileController.js
│   ├── routes/
│   │   └── fileRoutes.js
│   ├── utils/
│   │   └── fileMerger.js
│   ├── index.js
│
├── .env
├── package.json
├── README.md
├── projects/ (generated dynamically based on project names)
│   └── MyProject/
│       └── output.md (generated after running the script)
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/files-utils.git
   cd files-utils
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PROJECTS_BASE_PATH=./projects
   ```

## Usage

1. Start the server:

   ```sh
   npm start
   ```

2. Use an HTTP client like Postman to send a POST request to `http://localhost:3000/api/merge-files` with a JSON body containing the `projectName` and `filePaths`, for example:
   ```json
   {
     "projectName": "MyProject",
     "filePaths": ["/absolute/path/to/file1.txt", "/absolute/path/to/file2.txt"]
   }
   ```

## License

[MIT](LICENSE)

```

By including the directory structure in the `README.md` file, you provide a clear and organized overview of the project for anyone who uses or contributes to it. This approach also keeps the documentation close to the source code, making it easier to maintain.
```
