import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updateColor } from "../../../utils/services/dashboard/ColorService";

export const AdminEditColor = ({ show, onHide, color }) => {
  const [formData, setFormData] = useState({
    name: color.name,
    hex_code: color.hex_code,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateColor(color.id, formData);
      alert("Color updated successfully");
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Error updating color:", error);
      alert("Failed to update color");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Color</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Color Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Color Hex Code</Form.Label>
            <Form.Control
              type="text"
              name="hex_code"
              value={formData.hex_code}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
