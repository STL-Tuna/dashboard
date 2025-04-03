import api from "../../api";

export const getBlogs = async () => {
  try {
    const response = await api.get("/blogs");
    return response.data.items;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await api.post("/blogs", blogData);
    console.log(blogData);
    return response.data;
  } catch (error) {
    console.error(`Error creating blogs: ${error}`);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    throw error;
  }
};