import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import styles from "../styles/Postcard.module.css";

const PostModal = React.lazy(() => import("./Modal"));

const PostCard = ({ post, editPost, deletePost, publishPost }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (
    !post.approved &&
    post.profile_id !== currentUser.id &&
    !currentUser.is_superuser
  ) {
    return null;
  }

  return (
    <Card className={styles.PostCard}>
      <Card.Img variant="top" src={post.image} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>

       
        <div className={styles.functionButtons}>
        <Button className={styles.btn} onClick={() => setShowModal(true)}>
    View Full Recipe
</Button>
        {showModal && (
          <PostModal
            show={showModal}
            onHide={() => setShowModal(false)}
            post={post}
          />
        )}
    {post.profile_id === currentUser.id && (
        <>
            <Button
                className={styles.btn}
                onClick={() => navigate(`/edit/${post.id}`)}
            >
                Edit
            </Button>
            <Button
                className={styles.btn}
                onClick={() => deletePost.mutate(post.id)}
            >
                Delete
            </Button>
        </>
    )}
    {currentUser.is_superuser && !post.approved && (
        <Button className={styles.btn} onClick={() => publishPost.mutate(post.id)}>
            Publish
        </Button>
    )}
</div>


        <div className={styles.profile}>
          <img
            src={post.profile_image}
            alt={`${post.display_name}'s profile`}
          />
          <span>{post.display_name}</span>
        </div>
        <div className={styles.details}>
          <div>Posted on: {new Date(post.created_at).toLocaleDateString()}</div>
          <span>
            Last Updated: {new Date(post.updated_at).toLocaleDateString()}
          </span>
        </div>
        <div
          className={styles.likes}
          onClick={() => toggleLike(post.id)}
          title={post.isLiked ? "Unlike" : "Like"}
        >
          <FontAwesomeIcon icon={post.isLiked ? solidHeart : regularHeart} />
          {post.likesCount}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
