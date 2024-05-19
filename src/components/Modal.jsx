import React from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import styles from '../styles/Modal.module.css';

function PostModal({ post, show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header>
        <Modal.Title className={styles.modalTitle}>{post.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        <img src={post.image} alt="Recipe" className={`${styles.imgFluid} mb-3`} />
        <p><strong>Description:</strong> {post.description}</p>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Ingredients:</strong> {post.ingredients}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Recipe:</strong> {post.recipe}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Cooking Time:</strong> {post.cooking_time} minutes
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <div className={styles.profile}>
          <img
            src={post.profile_image}
            alt={`${post.display_name}'s profile`}
            className={styles.profileImage}
          />
          <span className={styles.profileName}>{post.display_name}</span>
        </div>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;


