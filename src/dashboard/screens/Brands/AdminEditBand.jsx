import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { updateBrand } from "../../../utils/services/dashboard/BrandService";

export const AdminEditBrand = ({ show, onHide, item, onSuccess }) => {
  const [formData, setFormData] = useState({
    brand_name: "",
    author: item.author,
    brand_details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form data when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        brand_name: item.brand_name || "",
        author: item.author,
        brand_details: item.brand_details || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await updateBrand(item.id, formData);
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand Details</Form.Label>
            <Form.Control
              as="textarea"
              name="brand_details"
              value={formData.brand_details}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

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