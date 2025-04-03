import React, {useState} from "react";
import { Button } from "react-bootstrap";
import { AdminAddColor } from "./AdminAddColor";
import { AdminColorTable } from "./AdminColorTable";

export const AdminColor = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddColor = () => {
    setShowAddModal(true);
  };

  return (
    <div>
      <h3 className="mb-4">Color Management</h3>
      <Button variant="primary" onClick={handleAddColor} className="mb-4">
        Add New Color
      </Button>
      <AdminColorTable />
      <AdminAddColor
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </div>
  );
};
