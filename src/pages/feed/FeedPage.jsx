import React from "react";
import PostCard from "../../components/PostCard";
import usePosts from "../../hooks/usePosts";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles/FeedPage.module.css";

const FeedPage = () => {
    const { data, isLoading, error, editPost, deletePost, publishPost,onSearch } = usePosts();
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div className={styles.FeedPage}>
        <h1>Post Feed</h1>

        <SearchBar />
        {data.pages.map(page => (
          page.map(post => (
            <PostCard post={post} key={post.id}  editPost={editPost} deletePost={deletePost} publishPost={publishPost} />            
          ))
        ))}
      </div>
    );
  };

export default FeedPage;