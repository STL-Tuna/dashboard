import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal, Toast } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

import { useCatalogue } from "../../../hooks/useCatalogue";
import { deleteCatalogue } from "../../../utils/services/dashboard/CatalgoueService";

export const AdminCatalogueTable = () => {
  const { catalogue, loading, error } = useCatalogue();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Function to handle delete button click
  const handleDeleteClick = (id) => {
    setBlogToDelete(id);
    setShowConfirmModal(true);
  };

  // Function to confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteCatalogue(blogToDelete);
      setShowConfirmModal(false);
      setToastMessage("Catalogue deleted successfully!");
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
      setShowConfirmModal(false);
      setToastMessage("Failed to delete Catalogue. Please try again.");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalogue.map((blog, index) => (
            <tr key={blog.id}>
              <td>{index + 1}</td>
              <td>{blog.title}</td>
              <td>
                <Link to={`/dashboard/products/catalogue/${blog.catalogs[0].id}`}>
                  <Button variant="link" size="sm">
                    <Eye />
                  </Button>
                </Link>
                {/* <Button variant="link" size="sm">
                  <Pencil />
                </Button> */}
                <Button
                  variant="link"
                  size="sm"
                  className="text-danger"
                  onClick={() => handleDeleteClick(blog.catalogs[0].id)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bootstrap Toast for Notifications */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000} // The toast will auto-dismiss after 3 seconds
        autohide
        className={`position-fixed top-0 end-0 m-3 bg-${toastVariant} text-white`}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};
