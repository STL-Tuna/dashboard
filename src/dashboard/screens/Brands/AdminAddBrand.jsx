import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBrand } from "../../../utils/services/dashboard/BrandService";

export const AdminAddBrand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand_name: "",
    author: 1,
    brand_details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Basic validation
    if (!formData.brand_name.trim()) {
      setError("Brand name is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await createBrand(formData);
      setSuccess(true);
      setFormData({
        brand_name: "",
        brand_details: "",
      });
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      if (response.status === 201) {
        alert("Brand created successfully");
        navigate("/brands");
      }
    } catch (err) {
      console.error("Error creating brand:", err);
      setError(err.response?.data?.message || "Error creating brand");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">Add New Brand</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Brand created successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control
            type="text"
            name="brand_name"
            placeholder="Enter brand name"
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
            placeholder="Enter brand details (optional)"
            value={formData.brand_details}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};
