import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import usePosts from "../../hooks/usePosts";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles/FeedPage.module.css";

const FeedPage = () => {
  const { data, isLoading, error, editPost, deletePost, publishPost, onSearch } = usePosts();
  const [postsData, setPostsData] = useState({ pages: [] });

  useEffect(() => {
    setPostsData(data);
  }, [data]);

  const handleLikeChange = (postId, newLikesCount) => {
    setPostsData(prevData => ({
      ...prevData,
      pages: prevData.pages.map(page =>
        page.map(post =>
          post.id === postId ? { ...post, likes_count: newLikesCount } : post
        )
      )
    }));
  };

  if (isLoading) return <div className={styles.LoadingSpinner}>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.FeedPage}>
      <h1>Post Feed</h1>
      <SearchBar onSearch={onSearch} />
      <div className={styles.CardFeed}>
        {postsData.pages && postsData.pages.length > 0 ? (
          postsData.pages.map((page) =>
            page.map(post => (
              <PostCard
                post={post}
                key={post.id}
                editPost={editPost}
                deletePost={deletePost}
                publishPost={publishPost}
                onLikeChange={handleLikeChange}
              />
            ))
          )
        ) : (
          <div>No posts available.</div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;

