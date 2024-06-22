// frontend/src/services/api.js
// /frontend/src/services/api.js

export const fetchProjects = async () => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects`);
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const createProject = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectName }),
    });
    if (!response.ok) {
      throw new Error("Failed to create project");
    }
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getProjectDetails = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects/${projectName}/details`);
    if (!response.ok) {
      throw new Error("Failed to fetch project details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

export const mergeFiles = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects/${projectName}/merge`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to merge files");
    }
  } catch (error) {
    console.error("Error merging files:", error);
    throw error;
  }
};

export const addFilePaths = async (projectName, filePaths) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects/${projectName}/files`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePaths }),
    });
    if (!response.ok) {
      throw new Error("Failed to add file paths");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding file paths:", error);
    throw error;
  }
};

export const removeFilePaths = async (projectName, filePaths) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects/${projectName}/files`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePaths }),
    });
    if (!response.ok) {
      throw new Error("Failed to remove file paths");
    }
  } catch (error) {
    console.error("Error removing file paths:", error);
    throw error;
  }
};

export const getProjectFiles = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects/${projectName}/files`);
    if (!response.ok) {
      throw new Error("Failed to fetch project files");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project files:", error);
    throw error;
  }
};
