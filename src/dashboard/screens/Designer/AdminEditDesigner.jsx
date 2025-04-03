import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { updateDesigner } from "../../../utils/services/dashboard/DesignerService";

export const AdminEditDesigner = ({ show, onHide, item, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    location: "",
    description: "",
    socialmedia: {
      instagram: "",
      facebook: ""
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form data when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        fullname: item.fullname || "",
        location: item.location || "",
        description: item.description || "",
        socialmedia: {
          instagram: item.socialmedia?.instagram || "",
          facebook: item.socialmedia?.facebook || ""
        }
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the field is in socialmedia object
    if (name.startsWith("socialmedia.")) {
      const socialMediaField = name.split(".")[1];
      setFormData(prevData => ({
        ...prevData,
        socialmedia: {
          ...prevData.socialmedia,
          [socialMediaField]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await updateDesigner(item.id, formData);
      if (onSuccess) onSuccess();
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Error updating brand:", error);
      setError(error.response?.data?.message || "Failed to update brand");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Designer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
          </Form.Group>

          <h5>Social Media</h5>
          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                name="socialmedia.instagram"
                value={formData.socialmedia.instagram}
                onChange={handleChange}
                placeholder="Instagram username"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Facebook</Form.Label>
              <Form.Control
                type="text"
                name="socialmedia.facebook"
                value={formData.socialmedia.facebook}
                onChange={handleChange}
                placeholder="Facebook username or URL"
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};