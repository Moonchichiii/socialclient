import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axiosDefaults';
import Cookies from "js-cookie";
import { MutatingDots } from "react-loader-spinner";

// Create a context for the current user
export const CurrentUserContext = createContext();

// Custom hook to access the current user context
export const useCurrentUser = () => useContext(CurrentUserContext);

// Provider component for the current user context
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to set the authentication state and navigate to the dashboard
  const setAuth = (user, accessToken, refreshToken) => {
    setCurrentUser(user);
    Cookies.set("jwt_access_token", accessToken, {
      expires: 1 / 24,
      path: "/"
    });
    Cookies.set("jwt_refresh_token", refreshToken, { expires: 5, path: "/" });
    navigate("/dashboard");
  };

  // Fetch the current user on component mount
  useEffect(() => {
    const accessToken = Cookies.get("jwt_access_token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    axiosInstance.get("/dj-rest-auth/user/")
      .then(response => {
        setCurrentUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response?.status === 401) {
          console.log("Session expired. Please log in again.");
        } else {
          console.error("Error validating current user:", error);
        }
        setCurrentUser(null);
        navigate("/login");
        setLoading(false);
      });
  }, [navigate]);

  // Add CSRF token and access token to request headers
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        const csrfToken = Cookies.get("csrftoken");
        const accessToken = Cookies.get("jwt_access_token");
        if (csrfToken) {
          config.headers["X-CSRFToken"] = csrfToken;
        }
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Handle token refresh on 401 Unauthorized response
    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          try {
            const { data } = await axiosInstance.post("/api/token/refresh/");
            Cookies.set("jwt_access_token", data.access);
            return axiosInstance.request(error.config);
          } catch (refreshError) {
            console.log("Unable to refresh token, please log in again.");
            setCurrentUser(null);
            navigate("/login");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on component unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);


  // Function to log out the current user
  const logout = () => {    
    setCurrentUser(null);    
    Cookies.remove("jwt_access_token", { path: "/" });
    Cookies.remove("jwt_refresh_token", { path: "/" });    
    navigate("/login");
  };

  // Value for the current user context
  const contextValue = {
    currentUser,
    setCurrentUser: setAuth,
    loading,
    logout
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {loading ? (
        <MutatingDots
          visible={true}
          height="150"
          width="150"
          color="#F9B233"
          secondaryColor="#F9B233"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass="d-flex justify-content-center align-items-center h-100"
        />
      ) : (
        children
      )}
    </CurrentUserContext.Provider>
  );
};
