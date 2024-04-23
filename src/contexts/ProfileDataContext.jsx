import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosDefaults";
export const ProfileDataContext = createContext();
export const useProfileData = () => useContext(ProfileDataContext);
const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("/api/profile/");
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };
    fetchProfileData();
  }, []);
  return (
    <ProfileDataContext.Provider value={profileData}>
      {children}
    </ProfileDataContext.Provider>
  );
};
export default ProfileDataProvider;
