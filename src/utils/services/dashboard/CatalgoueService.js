import api from "../../api";

export const getCatalogue = async () => {
  try {
    const response = await api.get("/catalog");
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const getCatalogueDetails = async (id) => {
  try {
    const response = await api.get(`/catalog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching catalog details: ${error}`);
    throw error;
  }
};

export const createCatalogue = async (data) => {
  try {
    const response = await api.post("/catalog", data);
    return response.data;
  } catch (error) {
    console.error(`Error creating blogs: ${error}`);
    throw error;
  }
};

export const deleteCatalogue = async (id) => {
  try {
    const response = await api.delete(`/catalog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting catalogue: ${error}`);
    throw error;
  }
};