import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { AdminPopupTable } from "./AdminPopupTable";

export const AdminPopup = () => {

  const handleAddPopup = () => {
    navigate("/popup/add");
  };

  let navigate = useNavigate();

  return (
    <div>
      <h3 className="mb-4">Popup Management</h3>
      <Button variant="primary" onClick={handleAddPopup} className="mb-4">
        Add New Popup
      </Button>
      <AdminPopupTable />
    </div>
  );
};
