import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { addDesigner } from "../../../utils/services/dashboard/DesignerService";

export const AdminAddDesigner = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    location: "",
    description: "",
    socialmedia: {
      instagram: "",
      facebook: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the field is a social media field
    if (name === "instagram" || name === "facebook") {
      setFormData(prev => ({
        ...prev,
        socialmedia: {
          ...prev.socialmedia,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDesigner(formData);
      onHide(); 
      
    } catch (error) {
      console.error("Error adding designer:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Designer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Fullname</Form.Label>
            <Form.Control 
              type="text" 
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name" 
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
              placeholder="Enter address" 
              required 
            />
          </Form.Group>
          
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Instagram</Form.Label>
                <Form.Control 
                  type="text" 
                  name="instagram"
                  value={formData.socialmedia.instagram}
                  onChange={handleChange}
                  placeholder="Instagram handle" 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Facebook</Form.Label>
                <Form.Control 
                  type="text" 
                  name="facebook"
                  value={formData.socialmedia.facebook}
                  onChange={handleChange}
                  placeholder="Facebook profile" 
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
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