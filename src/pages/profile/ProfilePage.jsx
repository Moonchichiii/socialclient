import React, { useState } from 'react';
import { useProfileData } from '../../contexts/ProfileDataContext';

const ProfilePage = () => {
    const { profileData, isLoading, error } = useProfileData();
    const [editData, setEditData] = useState({ username: profileData.username || '', image: profileData.image || '' }); 

    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();        
        
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Profile Page - Edit Profile</h1>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    name="username"
                    value={editData.username}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="image"
                    value={editData.image}
                    onChange={handleInputChange}
                />
                <button type="submit">Update Profile</button>
            </form>            
        </div>
    );
};

export default ProfilePage;