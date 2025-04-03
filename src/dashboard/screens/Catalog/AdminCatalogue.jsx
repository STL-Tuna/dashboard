import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { AdminCatalogueTable } from "./AdminCatalogueTable";
// import { AdminAddBlog } from "./AdminAddBlog";

export const AdminCatalogue = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddBlog = () => {
    navigate("/products/catalogue/add");
  };

  return (
    <div>
      <h3 className="mb-4">Catalogue Management</h3>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={handleAddBlog}>
            Add New Catalogue
          </Button>
        </Col>
        <Col>
          <InputGroup>
            <FormControl placeholder="Search blogs..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
      <AdminCatalogueTable />
    </div>
  );
};
