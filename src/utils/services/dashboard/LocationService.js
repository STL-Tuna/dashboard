import api from "../../api";

export const getLocations = async () => {
  try {
    const response = await api.get("/location");
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const createLocation = async (data) => {
  try {
    const response = await api.post("/location", data);
    return response.data;
  } catch (error) {
    console.error(`Error creating blogs: ${error}`);
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await api.delete(`/location/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const response = await api.put(`/location/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};
