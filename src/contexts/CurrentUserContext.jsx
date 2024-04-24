import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo
} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosDefaults";
import Cookies from "js-cookie";
import LoadingSpinner from "../components/LoadingSpinner";

export const CurrentUserContext = createContext(null);

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const setAuth = (user, accessToken, refreshToken) => {
    setCurrentUser(user);
    Cookies.set("jwt_access_token", accessToken, {
      expires: 1 / 24,
      path: "/"
    });
    Cookies.set("jwt_refresh_token", refreshToken, { expires: 5, path: "/" });
    navigate("/dashboard");
  };

  useEffect(() => {
    const accessToken = Cookies.get("jwt_access_token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    axiosInstance
      .get("/dj-rest-auth/user/")
      .then((response) => {
        setCurrentUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("Session expired. Please log in again.");
        } else {
          console.error("Validation error.", error);
        }
        setCurrentUser(null);
        navigate("/login");
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
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
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const { data } = await axiosInstance.post("api/token/refresh/");
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

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  const logout = () => {
    setCurrentUser(null);
    Cookies.remove("jwt_access_token", { path: "/" });
    Cookies.remove("jwt_refresh_token", { path: "/" });
    Cookies.remove("csrftoken", { path: "/" });
    Cookies.remove("sessionid", { path: "/" });
    Cookies.remove("messages", { path: "/" });
    navigate("/login");
  };

  const contextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser: setAuth,
      loading,
      logout
    }),
    [currentUser, loading]
  );

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {!loading ? children : <LoadingSpinner />}
    </CurrentUserContext.Provider>
  );
};
