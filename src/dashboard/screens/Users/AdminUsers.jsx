import React, { useState } from "react";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { AdminUserTable } from "./AdminUserTable";
import { AdminAddUser } from "./AdminAddUser";

export const AdminUser = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  return (
    <div>
      <h3 className="mb-4">User Management</h3>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={handleAddUser}>
            Add New User
          </Button>
        </Col>
        <Col>
          <InputGroup>
            <FormControl placeholder="Search users..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
      <AdminUserTable />
      <AdminAddUser show={showAddModal} onHide={() => setShowAddModal(false)} />
    </div>
  );
};
