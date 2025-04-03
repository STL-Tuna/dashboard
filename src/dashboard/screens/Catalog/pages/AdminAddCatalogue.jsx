import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { createCatalogue } from "../../../../utils/services/dashboard/CatalgoueService";

export const AdminAddCatalogue = () => {
  const [productId, setProductId] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!productId || !file) {
      setError("Product ID and PDF file are required");
      return;
    }

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("image_url", file);

    try {
      setIsSubmitting(true);
      await createCatalogue(formData);
      setSuccess("Catalogue created successfully!");
      setProductId("");
      setFile(null);
    } catch (err) {
      console.error("Error creating catalogue:", err);
      setError(err.message || "Failed to create catalogue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setError("Please upload a PDF file");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Catalogue</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId" className="mb-3">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="catalogueFile" className="mb-3">
          <Form.Label>Catalogue PDF</Form.Label>
          <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
          <Form.Text muted>
            Please upload a PDF file for the catalogue.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Catalogue"}
        </Button>
      </Form>
    </Container>
  );
};
