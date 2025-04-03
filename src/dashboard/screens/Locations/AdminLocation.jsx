import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { AdminLocationTable } from "./AdminLocationTable";

export const AdminLocation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddBlog = () => {
    navigate("/locations/add");
  };

  return (
    <div>
      <h3 className="mb-4">Location Management</h3>
      <Button variant="primary" onClick={handleAddBlog} className="mb-4">
        Add New Location
      </Button>
      <AdminLocationTable />
    </div>
  );
};
