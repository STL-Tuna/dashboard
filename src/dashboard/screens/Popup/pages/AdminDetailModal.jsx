import React from "react";
import { Modal, Button } from "react-bootstrap";

export const AdminDetailModal = ({ show, onHide, popup }) => {
  if (!popup) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{popup.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img 
              src={popup.image_url} 
              alt={popup.title} 
              className="img-fluid rounded h-75"
            />
          </div>
          <div className="col-md-6">
            <h4>{popup.description.title}</h4>
            <p className="text-muted">{popup.description.subTitle}</p>
            
            {popup.description.discount && (
              <p>
                <strong>Discount:</strong> {popup.description.discount}%
              </p>
            )}
            
            <p>
              <strong>Button Text:</strong> {popup.description.btnText}
            </p>
            
            <p>
              <strong>Button Link:</strong>{" "}
              <a href={popup.description.btnPath} target="_blank" rel="noopener noreferrer">
                {popup.description.btnPath}
              </a>
            </p>
            
            <p>
              <strong>Status:</strong>{" "}
              {popup.isPinned ? "Pinned" : "Not Pinned"}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};