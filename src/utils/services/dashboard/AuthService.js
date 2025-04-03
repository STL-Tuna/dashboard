import api from "../../api";

export const authService = {
    login: async (credentials) => {
      try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    logout: async () => {
      try {
        await api.post('/auth/logout');
      } catch (error) {
        throw error;
      }
    },
    
    getCurrentUser: async () => {
      try {
        const response = await api.get('/auth/me');
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };
