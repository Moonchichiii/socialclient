import React, { useState, useEffect } from 'react';
import { useProfileData } from '../../contexts/ProfileDataContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Form, Button, Alert, Spinner } from "react-bootstrap"; 
import axiosInstance from '../../api/axiosDefaults';
import styles from '../../styles/ProfilePage.module.css';

const ProfilePage = () => {
    const { profileData, isLoading, error, refreshProfileData } = useProfileData();
    const [editData, setEditData] = useState({ username: profileData.username || '', image: null }); 
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        setEditData({ ...editData, image: file });
    };

    useEffect(() => {
        if (profileData) {
            setEditData({
                username: profileData.username || '',
                image: null
            });
        }
    }, [profileData]);
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', editData.username);
        if (editData.image) {
            formData.append('image', editData.image);
        }
    
        try {
            const response = await axiosInstance.put(`profiles/${profileData.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
            console.log('Profile updated successfully:', response.data);
            refreshProfileData(); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error updating profile. Please try again.";
            setSuccessMessage('');
            setErrorMessage(errorMessage);
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log(profileData);

    return (
        <div className={styles.profilePage}>
            <h1>Profile Page - Edit Profile</h1>
            {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && (
                <Alert variant="danger">{errorMessage}</Alert>
            )}
            <div className={styles.profileUpdateSection}>
                {profileData ? (
                    <div>
                        <img src={imagePreview || profileData.profile_image} alt="Profile" className={styles.profileImage} />
                        <p>Profile Name: {profileData.username}</p>
                    </div>
                ) : (
                    <p>No profile data</p>
                )}
            </div>

            <Form onSubmit={handleUpdateProfile} className={styles.profileUpdateForm}>
                <Form.Group controlId="UpdateProfile" className={styles["form-group"]}>
                    <Form.Label className={styles["form-label"]}>Change Profile Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={editData.username}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                
                <Form.Group controlId="formBasicFile" className={styles["form-group"]}>
                    <Form.Label className={styles["form-label"]}>Update Profile Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Button type="submit" disabled={isLoading || !editData.username.trim()} className={`mt-3 ${styles["form-button"]} btn btn-primary`}>
                    {isLoading ? (
                        <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="sr-only">Loading...</span>
                        </>
                    ) : "Update Profile"}
                </Button>
            </Form>             
        </div>
    );
};

export default ProfilePage;
