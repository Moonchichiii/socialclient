import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertModal = ({ show, onHide, message }) => {
  return (
    <Modal show={show} onHide={onHide}>
        <Modal.Body style={{ color: '#000' }}>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
