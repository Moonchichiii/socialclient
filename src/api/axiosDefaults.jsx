import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

axiosInstance.interceptors.request.use(
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
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
