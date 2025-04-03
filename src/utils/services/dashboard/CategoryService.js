import api from "../../api";

export const getCategories = async () => {
  try {
    const response = await api.get("/category", {
      params: {
        page: 1,
        limit: 10,
        sort: "desc",
      },
    });
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/category", categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error creating category: ${error}`);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/category/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category: ${error}`);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};
