import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Eye, Trash } from "react-bootstrap-icons";
import { usePopup } from "../../../hooks/usePopup";
import { AdminDetailModal } from "./pages/AdminDetailModal"; // Adjust the import path

export const AdminPopupTable = () => {
  const { popups } = usePopup();
  const [showModal, setShowModal] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState(null);

  const handleViewClick = (popup) => {
    setSelectedPopup(popup);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPopup(null);
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {popups.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description.title}</td>
              <td>
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={() => handleViewClick(item)}
                >
                  <Eye />
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-danger"
                  // onClick={() => handleDeleteClick(item.id)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AdminDetailModal 
        show={showModal} 
        onHide={handleCloseModal} 
        popup={selectedPopup} 
      />
    </>
  );
};