import React from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import styles from '../styles/Modal.module.css';

function PostModal({ post, show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="md">
      <Modal.Header>
        <Modal.Title>{post.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <img src={post.image} alt="Recipe" className="img-fluid" />
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

      <Modal.Footer>
        <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center' }}>
          <img
            src={post.profile_image}
            alt={`${post.display_name}'s profile`}
            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
          />
          <span>{post.display_name}</span>
        </div>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;

