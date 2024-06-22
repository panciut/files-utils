# files-utils

This repository contains both the backend and frontend for the files-utils application.

## Setup

### Backend

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file with the necessary environment variables.

4. Start the backend:

   ```sh
   npm run start
   ```

### Frontend

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend:

   ```sh
   npm start
   ```

## Running Both Projects

- To run both the backend and frontend together, use:

  ```sh
  npm start
  ```

- To run only the backend:

  ```sh
  npm run start:backend
  ```

- To run only the frontend:

  ```sh
  npm run start:frontend
  ```

## Scripts

### Root-Level Scripts

- `start`: Run both backend and frontend.
- `start:backend`: Run only the backend.
- `start:frontend`: Run only the frontend.

### Backend Scripts

Located in `backend/package.json`:

- `start`: Start the backend server.
- `dev`: Start the backend server with nodemon.
- `merge-files`: Run the merge files CLI script.
- `create-project`: Run the create project CLI script.

### Frontend Scripts

Located in `frontend/package.json`:

- `start`: Start the frontend development server.

````

### Root-Level `package.json`

Create a `package.json` at the root level to manage scripts for both frontend and backend:

```json
{
  "name": "files-utils",
  "version": "1.0.0",
  "description": "Monorepo for files-utils backend and frontend",
  "private": true,
  "scripts": {
    "start": "concurrently \"npm run start --prefix backend\" \"npm run start --prefix frontend\"",
    "start:backend": "npm run start --prefix backend",
    "start:frontend": "npm run start --prefix frontend"
  },
  "devDependencies": {
    "concurrently": "^6.3.0"
  }
}
````

### Additional Adjustments

1. **Ensure All Relative Paths Are Correct:**

   - Verify that all relative paths in your backend code still point to the correct locations after moving into the `backend` directory.

2. **Environment Variables:**

   - Ensure the `.env` files for both frontend and backend are correctly configured and placed in their respective directories.

3. **Check Dependency Installation:**
   - After restructuring, run `npm install` in both `backend` and `frontend` directories to ensure all dependencies are correctly installed.
