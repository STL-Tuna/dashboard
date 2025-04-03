import React, { useState } from "react";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { AdminDesignerTable } from "./AdminDesignerTable";
import { AdminAddDesigner } from "./AdminAddDesigner";

export const AdminDesigner = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddBlog = () => {
    setShowAddModal(true);
  };
  return (
    <div>
      <h3 className="mb-4">Designer Management</h3>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={handleAddBlog}>
            Add New Designer
          </Button>
        </Col>
        <Col>
          <InputGroup>
            <FormControl placeholder="Search blogs..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
      <AdminDesignerTable />
      <AdminAddDesigner
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
      
    </div>
  );
};
