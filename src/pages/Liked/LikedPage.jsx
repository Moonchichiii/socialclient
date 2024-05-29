import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosDefaults";
import PostCard from "../../components/PostCard";
import styles from "../../styles/LikedPostsPage.module.css";

const LikedPostsPage = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/posts/liked-posts/");        
        setLikedPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch liked posts", error.response || error);
      }
    };

    fetchLikedPosts();
  }, []);

  const handleLikeChange = (postId, newLikesCount) => {
    setLikedPosts((prevLikedPosts) =>
      prevLikedPosts.map((post) =>
        post.id === postId ? { ...post, likes_count: newLikesCount } : post
      )
    );
  };

  return (
    <div className={styles.likedPostsPage}>
      <h1>Liked Posts</h1>
      <section className={styles.postsSection}>
        {likedPosts.length ? (
          likedPosts.map((post) => (
            <PostCard
              post={post}
              key={post.id}
              onLikeChange={handleLikeChange}
            />
          ))
        ) : (
          <p>No posts liked yet!</p>
        )}
      </section>
    </div>
  );
};

export default LikedPostsPage;
