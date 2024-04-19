import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefualt";


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);      
      navigate("/login");
    }
  };

  useEffect(() => {
    if (shouldRefreshToken()) {
      handleMount();
    }
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            setCurrentUser(data);
          } catch (err) {
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate("/login");
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && shouldRefreshToken()) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            setCurrentUser(data);
          } catch (err) {
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate("/login");
          }
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
