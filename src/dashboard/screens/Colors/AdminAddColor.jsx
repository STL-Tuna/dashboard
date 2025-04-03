import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createColor } from "../../../utils/services/dashboard/ColorService";

export const AdminAddColor = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: "",
    hex_code: "",
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
      await createColor(formData);
      onHide();
      setFormData({ name: "", hex_code: "" });
      alert("Added color successfully")
    } catch (error) {
      console.error("Error adding color:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Color</Modal.Title>
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
              placeholder="Black"
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
              placeholder="#000000"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};