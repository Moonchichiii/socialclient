import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axiosDefaults';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Cookies from "js-cookie";

const cookieOptions = {
  accessTokenOpts: { expires: 1 / 24, path: "/" },
  refreshTokenOpts: { expires: 7, path: "/" },
};

export function useAuth() {
  const { setCurrentUser, verifyAndFetchUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        const token = Cookies.get('jwt_access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return () => {      
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const setCookies = (accessToken, refreshToken) => {    
    Cookies.set("jwt_access_token", accessToken, { path: '/', expires: 1 / 24 });
    Cookies.set("jwt_refresh_token", refreshToken, { path: '/', expires: 7 });
};

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/token/", { username, password });
      const { access, refresh } = response.data;
      setCookies(access, refresh);
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
      const response = await axiosInstance.post("/api/register/", formData);
      const { access_token, refresh_token } = response.data;
      setCookies(access_token, refresh_token);
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
      const formData = { refresh: Cookies.get("jwt_refresh_token") };
      await axiosInstance.post("/api/logout/", formData);  
      Cookies.remove("jwt_access_token", { path: "/" });
      Cookies.remove("jwt_refresh_token", { path: "/" });  
      setCurrentUser(null);
      navigate("/");
  } catch (error) {
      console.error("Logout failed:", error);  
  }
};
  return { login, register, logout, isLoading, error };
}
