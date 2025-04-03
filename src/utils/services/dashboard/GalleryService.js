import api from "../../api";
export const getGalleries = async () => {
  try {
    const response = await api.get("/gallery");
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    const response = await api.delete(`/gallery/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting gallery: ${error}`);
    throw error;
  }
};

export const uploadGalleryItem = async (data) => {
  try {
    console.log(data)
    const response = await api.post(`/gallery/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error uploading gallery: ${error}`);
    throw error;
  }
};
