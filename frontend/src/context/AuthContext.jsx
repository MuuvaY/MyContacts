import { createContext, useState, useEffect, useContext } from "react";
import { authAPI, userAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur de connexion",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.data.success) {
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur d'inscription",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
