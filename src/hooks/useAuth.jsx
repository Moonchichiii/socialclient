import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axiosDefaults';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function useAuth() {
  const { setCurrentUser, verifyAndFetchUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async config => {
        try {
          const response = await axiosInstance.post("/api/token/refresh/");
          const { access } = response.data;
          config.headers.Authorization = `Bearer ${access}`;
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      console.log("Logging in...");
      await axiosInstance.post("/api/login/", { username, password });
      await verifyAndFetchUser();
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response && err.response.data) {
        const { detail, non_field_errors } = err.response.data;
        const errorMessage = detail || non_field_errors;
        if (errorMessage) {
          setError(errorMessage);
        } else {
          setError("Oops! Failed to log in, check credentials and try again!");
        }
      } else {
        setError("Oops! Failed to log in, check credentials and try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    try {
      console.log("Registering...");
      await axiosInstance.post("/api/register/", formData);
      await verifyAndFetchUser();
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ general: "Registration failed. Please try again later." });
      }
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out...");
      await axiosInstance.post("/api/logout/");  
      document.cookie = "jwt_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "jwt_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);  
    }
  };

  return { login, register, logout, isLoading, error };
}
