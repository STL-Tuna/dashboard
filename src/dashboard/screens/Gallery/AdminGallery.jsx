import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { AdminAddGallery } from "./AdminAddGallery";
import { useGallery } from "../../../hooks/useGallery";
import { deleteGalleryItem } from "../../../utils/services/dashboard/GalleryService";

export const AdminGallery = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { gallery, loading, error } = useGallery(); 
  const [deleting, setDeleting] = useState(null); 

  // Handle delete image
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setDeleting(id);
    try {
      await deleteGalleryItem(id);
      // setGallery((prev) => prev.filter((item) => item.id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const handleAddBlog = () => {
    setShowAddModal(true);
  };

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3 className="mb-4">Gallery Management</h3>
      <Button variant="primary" onClick={handleAddBlog} className="mb-4">
        Upload Image
      </Button>
      <div className="d-flex flex-wrap gap-3">
        {gallery.map((image) => (
          <Card key={image.id} style={{ width: "200px", position: "relative" }}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(image.id)}
              disabled={deleting === image.id}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                padding: "2px 5px",
                fontSize: "12px",
              }}
            >
              {deleting === image.id ? "..." : <Trash size={12} />}
            </Button>
            <Card.Img variant="top" src={image.image_url} />
          </Card>
        ))}
      </div>
      <AdminAddGallery
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </div>
  );
};
