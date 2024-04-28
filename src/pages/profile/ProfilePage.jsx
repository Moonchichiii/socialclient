import React, { useState, useEffect } from 'react';
import { useProfileData } from '../../contexts/ProfileDataContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axiosInstance from '../../api/axiosDefaults';
import styles from '../../styles/ProfilePage.module.css';
import { ColorRing } from 'react-loader-spinner';


const ProfilePage = () => {
    const { profileData, isLoading, error, refreshProfileData } = useProfileData();
    const [editData, setEditData] = useState({
        username: profileData?.username || '',
        image: null
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(profileData?.image?.url || '');

    useEffect(() => {
       
        if (profileData) {
            setEditData({
                username: profileData.username || '',
                image: null
            });
            setImagePreview(profileData.image?.url || '');
        }
    }, [profileData]);

    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
            setEditData({ ...editData, image: file });
        }
    };

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        if (!profileData) {
            setErrorMessage("No profile data available.");
            return;
        }

        const formData = new FormData();
        formData.append('username', editData.username);
        if (editData.image) {
            formData.append('image', editData.image);
        }

        try {
            const response = await axiosInstance.put("/api/profiles/current/", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccessMessage('Profile updated successfully!');
            refreshProfileData(); // To refresh profile data in context
        } catch (error) {
            setErrorMessage("Error updating profile: " + error.message);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;
console.log(profileData);
    return (
        <div className={styles.profilePage}>
            <h1>Profile Page - Edit Profile</h1>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <div className={styles.profileUpdateSection}>
                {profileData ? (
                    <div>
                        <img src={imagePreview || profileData.profile_image} alt="Profile" className={styles.profileImage} />
                        <p>Profile Name: {profileData.username}</p>
                    </div>
                ) : (
                    <p>No profile data</p>
                )}
                <Form onSubmit={handleUpdateProfile} className={styles.profileUpdateForm}>
                    <Form.Group controlId="UpdateProfile">
                        <Form.Label>Change Profile Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={editData.username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicFile">
                        <Form.Label>Update Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <Button type="submit" disabled={isLoading || !editData.username.trim()} className="mt-3 btn btn-primary">
                        {isLoading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                <span className="sr-only">Loading...</span>
                            </>
                        ) : "Update Profile"}
                    </Button>

                </Form>
            </div>
        </div>
    );
};

export default ProfilePage;
