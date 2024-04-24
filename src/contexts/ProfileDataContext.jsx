import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosDefaults";
import { useCurrentUser } from './CurrentUserContext';
import Cookies from "js-cookie";
import LoadingSpinner from '../components/LoadingSpinner';

export const ProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);

export const ProfileProvider = ({ children }) => { 
  // State to store the profile data
  const [profileData, setProfileData] = useState({});
  // State to track loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to store error message
  const [error, setError] = useState(null);
  // Access the current user from CurrentUserContext
  const currentUser = useCurrentUser();

  // Function to fetch profile data from the API
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("/api/profiles/current/");
      setProfileData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch profile data");
      setIsLoading(false);
    }
  };

  // Fetch profile data when the currentUser changes
  useEffect(() => {
    const accessToken = Cookies.get('jwt_access_token');
    const refreshToken = Cookies.get('jwt_refresh_token');

    if (currentUser && accessToken && refreshToken) {
      fetchProfileData();
    } else {    
      setIsLoading(false);
    }
  }, [currentUser]);

  // Function to refresh the profile data
  const refreshProfileData = () => {
    if (currentUser) {
      setIsLoading(true); 
      fetchProfileData();
    }
  };

  // Value to be provided to the context
  const value = {
    profileData,
    isLoading,
    error,
    refreshProfileData
  };

  return (
    <ProfileDataContext.Provider value={value}>
      {isLoading ? <LoadingSpinner /> : children}
    </ProfileDataContext.Provider>
  );
};
