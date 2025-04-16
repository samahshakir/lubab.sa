const API_URL = `${import.meta.env.VITE_API_URL}/api`

export async function getApplications() {
  try {
    const response = await fetch(`${API_URL}/applications`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
}

export async function getApplicationBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/applications/${slug}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching application with slug ${slug}:`, error);
    throw error;
  }
}

export async function handleCheck(userId) {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/is-admin`);
      if (!response.ok) {
        throw new Error("Failed to fetch admin status");
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err.message || "Something went wrong");
    }
  }