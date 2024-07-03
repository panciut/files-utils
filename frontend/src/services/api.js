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

export const removeProject = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects/${projectName}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete project");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const getProjectOutputFiles = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/projects/${projectName}/outputs`);
    if (!response.ok) {
      throw new Error("Failed to fetch output files");
    }
    const data = await response.json();
    return data.files.map((file) => ({
      name: file.name,
      tokens: file.tokens,
      content: null, // Initialize content as null; will fetch later
    }));
  } catch (error) {
    console.error("Error fetching output files:", error);
    throw error;
  }
};

export const getOutputFileContent = async (projectName, fileName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(
      `${apiUrl}/projects/${projectName}/output/${fileName}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch file content");
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Error fetching file content:", error);
    throw error;
  }
};

export const getProjectConfig = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/config/${projectName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch project config");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project config:", error);
    throw error;
  }
};

export const updateProjectConfig = async (projectName, config) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/config/${projectName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });
    if (!response.ok) {
      throw new Error("Failed to update project config");
    }
  } catch (error) {
    console.error("Error updating project config:", error);
    throw error;
  }
};

export const getTreeFiles = async (projectName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/trees/${projectName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tree files");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tree files:", error);
    throw error;
  }
};

export const getTreeFileContent = async (projectName, treeFileName) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(
      `${apiUrl}/trees/${projectName}/${treeFileName}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tree file content");
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Error fetching tree file content:", error);
    throw error;
  }
};
