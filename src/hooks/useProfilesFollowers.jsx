import { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosDefaults";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const useProfilesFollowers = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [profiles, setProfiles] = useState([]);
  const [followersList, setFollowers] = useState([]);
  const [followingList, setFollowing] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const fetchProfiles = async () => {
    try {
      const response = await axiosInstance.get("/api/profiles/");
      setProfiles(response.data);
    } catch (error) {
      console.error("Failed to fetch profiles", error.response || error);
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axiosInstance.get("/api/followers/");
      setFollowers(response.data.results);
    } catch (error) {
      console.error("Error fetching followers list", error.response || error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axiosInstance.get("/api/followers/following/");
      setFollowing(response.data.results);
      console.log("Fetched following:", response.data.results);
    } catch (error) {
      console.error("Error fetching following list", error.response || error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchProfiles();
      fetchFollowers();
      fetchFollowing();
    }
  }, [currentUser]);

  const handleFollow = async (profileId) => {
    try {
      const response = await axiosInstance.post(`/api/followers/${profileId}/`);
      setMessage(response.data.detail || "Successfully followed the profile.");
      setMessageType("success");
      fetchFollowing();
    } catch (error) {
      setMessage(error.response?.data?.detail || "Failed to follow profile");
      setMessageType("danger");
      console.error("Failed to follow profile", error.response || error);
    }
  };

  const handleUnfollow = async (profileId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/followers/${profileId}/`
      );
      setMessage(
        response.data.detail || "Successfully unfollowed the profile."
      );
      setMessageType("success");
      fetchFollowing();
    } catch (error) {
      setMessage(error.response?.data?.detail || "Failed to unfollow profile");
      setMessageType("danger");
      console.error("Failed to unfollow profile", error.response || error);
    }
  };

  const isFollowing = (profileId) => {
    return (
      Array.isArray(followingList) &&
      followingList.some((follower) => follower.profile_id === profileId)
    );
  };

  return {
    profiles,
    followersList,
    followingList,
    message,
    messageType,
    handleFollow,
    handleUnfollow,
    isFollowing,
  };
};

export default useProfilesFollowers;
