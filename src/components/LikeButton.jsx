import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../api/axiosDefaults";
import styles from "../styles/LikeButton.module.css";

const LikeButton = ({ postId, isLiked, likesCount, onLikeChange = () => {} }) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleLike = async () => {
    if (loading) return;

    setLoading(true);
    setError(""); 
    try {
      const method = liked ? 'delete' : 'post';
      console.log(`Toggle like method: ${method}`);
      const response = await axiosInstance[method](`/api/posts/${postId}/post-likes/`);
      
      setLiked(!liked);
      setCount(response.data.likes_count);
      onLikeChange(postId, response.data.likes_count);
    } catch (error) {
      console.error('Error toggling like:', error.response?.data || error.message || 'Unknown error');
      setError(error.response?.data.error || error.message || 'An error occurred'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div 
        className={styles.likeButtonContainer}
        onClick={toggleLike} 
        title={liked ? "Unlike" : "Like"} 
        aria-label={liked ? "Unlike" : "Like"}
      >
        <FontAwesomeIcon className={styles.icon} icon={liked ? solidHeart : regularHeart} />
        {count}
      </div>
      {error && (
        <div className="alert alert-danger mt-2" role="alert">
          {error} 
        </div>
      )}
    </div>
  );
};

export default LikeButton;


