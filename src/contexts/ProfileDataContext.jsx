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
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

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



  
  useEffect(() => {
    const accessToken = Cookies.get('jwt_access_token');
    const refreshToken = Cookies.get('jwt_refresh_token');

    if (currentUser && accessToken && refreshToken) {
      console.log("Fetching profile data...");
      fetchProfileData();
    } else {    
      setIsLoading(false);
    }
  }, [currentUser]);

  const refreshProfileData = () => {
    if (currentUser) {
      console.log("Refreshing profile data...");
      setIsLoading(true); 
      fetchProfileData();
    }
  };

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
