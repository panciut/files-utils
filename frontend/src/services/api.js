//frontend/src/services/api.js
export const fetchProjects = async () => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(apiUrl);
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
