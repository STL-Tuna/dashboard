import api from "../../api";

export const getBrands = async () => {
  try {
    const response = await api.get("/brands");

    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const createBrand = async (data) => {
  try {
    const response = await api.post("/brands", data);
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const deleteBrand = async (id) => {
  try {
    const response = await api.delete(`/brands/${id}`);
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const updateBrand = async (id, data) => {
  try {
    const response = await api.put(`/brands/${id}`, data);
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};
