import api from "../../api";

export const getDesigners = async () => {
  try {
    const response = await api.get("/designer");
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const getDesignerById = async (id) => {
  try {
    const response = await api.get(`/designer/${id}`);
    return response.data.items;
  } catch (error) {
    console.error(`Error fetching designer: ${error}`);
    throw error;
  }
};

export const addDesigner = async (data) => {
  try {
    const response = await api.post("/designer/profile", data);
    return response.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const addDesignerGallery = async (data) => {
  try {
    const response = await api.post("/designer/gallery", data);
    return response.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const deleteDesigner = async (id) => {
  try {
    const response = await api.delete(`/designer/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};

export const deleteDesignerGallery = async (id) => {
  try {
    const response = await api.delete(`/designer/gallery/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};

export const updateDesigner = async (id, data) => {
  try {
    const response = await api.put(`designer/${id}/edit-profile`, data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};
