import { useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axiosDefaults";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const useFollow = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [followingList, setFollowing] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const fetchFollowing = async () => {
    try {
      const response = await axiosInstance.get("/api/followers/");
      setFollowing(response.data.results || response.data);
    } catch (error) {
      console.error("Error fetching following list!", error.response || error);
      setFollowing([]);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchFollowing();
    }
  }, [currentUser]);

  const handleFollow = async (profileId) => {
    try {
      const response = await axiosInstance.post("/api/followers/", {
        profile_id: profileId,
      });
      setMessage(response.data.detail || "Success!");
      setMessageType("success");
      fetchFollowing();
    } catch (error) {
      setMessage(error.response?.data?.detail || "Failed to follow profile!");
      setMessageType("danger");
      console.error("Failed to follow profile!", error.response || error);
    }
  };

  const handleUnfollow = async (profileId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/followers/${profileId}/`
      );
      setMessage(
        response.data.detail || "Success!"
      );
      setMessageType("success");
      fetchFollowing();
    } catch (error) {
      setMessage(error.response?.data?.detail || "Failed to unfollow!");
      setMessageType("danger");
      console.error("Failed to unfollow!", error.response || error);
    }
  };

  const isFollowing = (profileId) => {
    return (
      Array.isArray(followingList) &&
      followingList.some((follower) => follower.profile.id === profileId)
    );
  };

  return {
    followingList,
    message,
    messageType,
    handleFollow,
    handleUnfollow,
    isFollowing,
  };
};

export default useFollow;
