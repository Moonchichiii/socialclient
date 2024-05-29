import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import LikeButton from "./LikeButton";
import PostModal from "./Modal"; 
import CommentBox from "./CommentBox";
import styles from "../styles/Postcard.module.css"; 
/* eslint-disable no-unused-vars */
const PostCard = ({ post, editPost, deletePost, publishPost, onLikeChange }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deletePost.mutate(post.id);
  };

  const handlePublish = () => {
    publishPost.mutate(post.id);
  };

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const handleLikeChange = (newLikesCount) => {
    onLikeChange(post.id, newLikesCount);
  };

  if (!post.approved && post.profile_id !== currentUser.id && !currentUser.is_superuser) {
    return null;
  }

  return (
    <>
      <Card className={styles.postCard}>
        <div className={styles.profile}>
          <img src={post.profile_image} alt={`${post.display_name}'s profile`} />
          <span>{post.display_name}</span>
          <span className={styles.date}>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <Card.Img className="mb-3" variant="top" src={post.image} alt={`${post.title} image`} />
        <Card.Body>
          <div className={styles.postDetails}>
            <LikeButton
              postId={post.id}
              isLiked={post.is_liked}
              likesCount={post.likes_count}
              onLikeChange={handleLikeChange}
            />
          </div>
          <div className="PostCardText">
          <Card.Title className="mt-2">{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
          </div>
          <div className={styles.functionButtons}>
            <Button className={styles.btn} onClick={() => setShowModal(true)}>
              View Full Recipe
            </Button>
            {showModal && <PostModal show={showModal} onHide={() => setShowModal(false)} post={post} />}
            {post.profile_id === currentUser.id && (
              <>
                <Button className={styles.btn} onClick={handleEdit}>
                  Edit
                </Button>
                <Button className={styles.btn} onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
            {currentUser.is_superuser && !post.approved && (
              <Button className={styles.btn} onClick={handlePublish}>
                Publish
              </Button>
            )}
          </div>
          <CommentBox postId={post.id} />
        </Card.Body>
      </Card>
    </>
  );
};

export default PostCard;
