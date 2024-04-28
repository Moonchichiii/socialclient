import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentUser } from './CurrentUserContext';


export const ProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);

export const ProfileProvider = ({ children }) => {
    const { currentUser } = useCurrentUser();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setProfileData({
                username: currentUser.username,
                image: currentUser.profile_image,
                ...currentUser 
            });
        } else {
            setProfileData(null);
        }
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={{ profileData, setProfileData }}>
            {children}
        </ProfileDataContext.Provider>
    );
};
