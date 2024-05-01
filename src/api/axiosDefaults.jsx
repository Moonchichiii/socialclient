import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    post: {
      "Content-Type": "multipart/form-data"
    }
  },
  withCredentials: true
});

export default axiosInstance;
