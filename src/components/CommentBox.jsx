import React, { useState, useEffect } from "react";
import { Accordion, ListGroup, FormControl, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../api/axiosDefaults";
import styles from "../styles/CommentBox.module.css";
import { NavLink } from "react-router-dom";

const CommentBox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState({ id: null, text: "" });
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/api/comments/${postId}/comments/`);
        setComments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditComment({ ...editComment, text: e.target.value });
  };

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/api/comments/${postId}/comments/`, { text: newComment });
      setComments([response.data, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
      setError("Failed to add comment");
    }
  };

  const handleEditCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`/api/comments/${postId}/comments/${editComment.id}/`, { text: editComment.text });
      setComments(comments.map((comment) => (comment.id === editComment.id ? response.data : comment)));
      setEditComment({ id: null, text: "" });
    } catch (error) {
      console.error("Failed to edit comment", error);
      setError("Failed to edit comment");
    }
  };

  const handleDeleteComment = async () => {
    try {
      await axiosInstance.delete(`/api/comments/${postId}/comments/${deleteCommentId}/`);
      setComments(comments.filter((comment) => comment.id !== deleteCommentId));
      setDeleteCommentId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete comment", error);
      setError("Failed to delete comment");
    }
  };

  const confirmDeleteComment = (commentId) => {
    setDeleteCommentId(commentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteCommentId(null);
  };

  return (
    <>
      <Accordion className={styles.commentBox} defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header className={styles.accordionHeader}>Comments</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleNewCommentSubmit} className={styles.commentForm}>
              <textarea
                value={newComment}
                onChange={handleNewCommentChange}
                placeholder="Add a comment..."
                required  
              />
              <button className={`${styles.btn} btn btn-sm`} type="submit">
                Post Your Comment
              </button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}

            <ListGroup variant="flush" className={styles.commentList}>
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment) => (
                  <ListGroup.Item key={comment.id} className={styles.comment}>
                    <div className={styles.commentHeader}>
                      <div className={styles.commentInfo}>
                        <img src={comment.profile_image} alt={`${comment.display_name}'s profile`} />
                        <span>{comment.display_name}</span>
                      </div>
                      <div className={styles.commentActions}>
                        <NavLink onClick={() => confirmDeleteComment(comment.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </NavLink>
                        <NavLink onClick={() => setEditComment({ id: comment.id, text: comment.text })}>
                          <FontAwesomeIcon icon={faEdit} />
                        </NavLink>
                      </div>
                    </div>
                    <div className={styles.commentBody}>
                      {editComment.id === comment.id ? (
                        <form onSubmit={handleEditCommentSubmit} className={styles.editCommentForm}>
                          <FormControl
                            as="textarea"
                            value={editComment.text}
                            onChange={handleEditCommentChange}
                            required
                          />
                          <button className={`${styles.btn} btn btn-primary btn-sm`} type="submit">
                            Save
                          </button>
                        </form>
                      ) : (
                        <p>{comment.text}</p>
                      )}
                      <small>{new Date(comment.created_at).toLocaleString()}</small>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <div>No comments ?</div>
              )}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className={styles.modal}>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <button className={`${styles.btn} btn btn-secondary`} onClick={handleCloseModal}>
            Cancel
          </button>
          <button className={`${styles.btn} btn btn-danger`} onClick={handleDeleteComment}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentBox;


