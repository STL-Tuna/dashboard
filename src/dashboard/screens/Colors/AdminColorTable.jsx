import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Trash, Pen } from "react-bootstrap-icons";
import { useColor } from "../../../hooks/useColor";
import { deleteColor } from "../../../utils/services/dashboard/ColorService";
import { AdminEditColor } from "./AdminEditColor"; // Import the edit modal

export const AdminColorTable = () => {
  const { colors, loading, error } = useColor();
  const [selectedColor, setSelectedColor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (color) => {
    setSelectedColor(color);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this color?")) {
        await deleteColor(id);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting color:", error);
      alert("Failed to delete color");
    }
  };

  if (loading) return <div>Loading colors...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Hex Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={color.id}>
              <td>{index + 1}</td>
              <td>{color.name}</td>
              <td>{color.hex_code}</td>
              <td>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary"
                  onClick={() => handleEdit(color)}
                >
                  <Pen />
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-danger"
                  onClick={() => handleDelete(color.id)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Color Modal */}
      {selectedColor && (
        <AdminEditColor
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          color={selectedColor}
        />
      )}
    </>
  );
};
