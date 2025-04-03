import api from "../../api";

export const getTags = async () => {
  try {
    const response = await api.get("/tag");
    console.log(response.data)
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const createTag = async (tagData) => {
  try {
    const response = await api.post("/tag", tagData);
    return response.data;
  } catch (error) {
    console.error(`Error creating category: ${error}`);
    throw error;
  }
};

export const deleteTag = async (id) => {
  try {
    const response = await api.delete(`/tag/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};
