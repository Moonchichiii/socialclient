import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import styles from '../styles/Postcard.module.css'; 

const PostCard = ({ post }) => {
  if (!post) {
    return <div>No post data</div>;
  }

  return (
    <Card className={styles.PostCard}>
      <Card.Img variant="top" src={post.image} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <div>
          <FontAwesomeIcon icon={faHeart} /> {post.likesCount || 0}
        </div>
        <div className={styles['profile-info']}>
          
          <span> <img src={post.profile_image} alt="Profile" />{post.profile_display_name}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;


