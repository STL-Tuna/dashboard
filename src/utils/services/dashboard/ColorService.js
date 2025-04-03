import api from "../../api";

export const getColors = async () => {
  try {
    const response = await api.get("/color");
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const createColor = async (data) => {
  try {
    const response = await api.post("/color", data);
    console.log(data);
    return response.data;
  } catch (error) {
    console.error(`Error creating blogs: ${error}`);
    throw error;
  }
};

export const deleteColor = async (id) => {
  try {
    const response = await api.delete(`/color/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};

export const updateColor = async (id, data) => {
  try {
    const response = await api.put(`/color/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};
