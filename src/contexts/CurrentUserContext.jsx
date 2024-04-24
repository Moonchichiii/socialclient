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
// Context for managing the current user
export const CurrentUserContext = createContext(null);

// Custom hook for accessing the current user context
export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

// Provider component for the current user context
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function for setting the authentication state
  const setAuth = (user, accessToken, refreshToken) => {
    setCurrentUser(user);
    navigate("/dashboard");
  };

  useEffect(() => {
    const accessToken = Cookies.get("jwt_access_token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    // Fetch the current user data from the server
    axiosInstance.get("/dj-rest-auth/user/")
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

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentUser,
    setCurrentUser: setAuth,
    loading
  }), [currentUser, loading]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {!loading ? children : <LoadingSpinner />}
    </CurrentUserContext.Provider>
  );
};
