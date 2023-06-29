import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ErrorModal = ({ title, summary, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{summary}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    關閉
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;
