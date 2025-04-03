import React, { useState } from "react";
import { Modal, Form, Button, Spinner, Alert } from "react-bootstrap";

export const AddGalleryImageModal = ({
  show,
  onHide,
  designerId,
  onUpload,
}) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setError(null);
      } else {
        setError("Please select a valid image file (JPEG, PNG, etc.)");
        setImage(null);
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image first");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("designer_id", designerId);
      formData.append("image_url", image);

      await onUpload(formData);
      onHide();
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Image to Gallery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </Form.Group>

          {imagePreview && (
            <div className="mb-3">
              <Image
                src={imagePreview}
                fluid
                alt="Preview"
                className="img-thumbnail"
              />
            </div>
          )}

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Upload Image"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
