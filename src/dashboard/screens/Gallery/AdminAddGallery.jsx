import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { uploadGalleryItem } from "../../../utils/services/dashboard/GalleryService";

export const AdminAddGallery = ({ show, onHide }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setError("");
      } else {
        setError("Please select a valid image file.");
        setImage(null);
        setImagePreview(null);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image to upload.");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image_url", image);

      await uploadGalleryItem(formData);
      onHide();
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {imagePreview && (
            <div className="text-center mb-3">
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                style={{
                  maxWidth: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <Form.Group className="mb-3 text-center">
            <Form.Label className="btn btn-secondary">
              {image ? "Change Image" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Form.Label>
          </Form.Group>

          {error && <p className="text-danger text-center">{error}</p>}

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
