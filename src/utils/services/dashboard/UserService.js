import api from "../../api";

export const getUsers = async() => {
    try{
        const response = await api.get('/user')
        return response.data.items;
    }
    catch(error){
        console.log(`Error: ${error}`);
        throw error;
    }
}

export const createUser = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error) {
      console.error(`Error creating blogs: ${error}`);
      throw error;
    }
  };