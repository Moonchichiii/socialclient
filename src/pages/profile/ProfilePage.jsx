import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Image } from "react-bootstrap";
import axiosInstance from "../../api/axiosDefaults";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/ProfilePage.module.css";

const ProfilePage = () => {
  const { currentUser, isLoading, verifyAndFetchUser } = useCurrentUser();
  const [editData, setEditData] = useState({
    display_name: "",
    profile_image: null,
    bio: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    if (currentUser) {
      setEditData({
        display_name: currentUser.display_name || currentUser.username,
        profile_image: currentUser.image,
        bio: currentUser.bio || ""
      });
      setImagePreview(currentUser.image);
    } else {
      verifyAndFetchUser();
    }
  }, [currentUser, verifyAndFetchUser]);

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData((prev) => ({ ...prev, profile_image: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("display_name", editData.display_name);
    formData.append("bio", editData.bio);
    if (editData.profile_image) {
      formData.append(
        "image",
        editData.profile_image,
        editData.profile_image.name
      );
    }

    axiosInstance
      .put(`/api/profiles/${currentUser.profile_id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((response) => {
        verifyAndFetchUser();
        setAlert({ type: "success", message: "Profile updated successfully!" });
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        setAlert({
          type: "danger",
          message: "Failed to update profile. Please try again!"
        });
      });
  };

  if (!currentUser) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.profilePage}>
      <h1>Profile Page - Update Profile</h1>
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
      {!isLoading ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="display_name">
            <Form.Label className="mt-2">Update Profile Name</Form.Label>
            <Form.Control
              type="text"
              name="display_name"
              value={editData.display_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="bio">
            <Form.Label className="mt-2">Update Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={editData.bio}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label className="mt-2">Update Profile Image</Form.Label>
            <Form.Control
              type="file"
              name="profile_image"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <Image
                className="mt-2"
                src={imagePreview}
                alt="Profile"
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            )}
          </Form.Group>
          <Button type="submit" className="mt-3 btn btn-primary">
            Update Profile
          </Button>
        </Form>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ProfilePage;
