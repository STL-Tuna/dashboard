import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {} from "../utils/services/dashboard/AuthService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login({ email, password });

      // Store token and user data
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      setUser(null);
      navigate("/auth");
    }
  };

  const initializeAuth = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && !user) {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error("Session validation failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    user,
    error,
    loading,
    login,
    logout,
    initializeAuth,
  };
};
