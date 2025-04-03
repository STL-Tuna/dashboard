import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { AdminBlogTable } from "./AdminBlogTable";
import { AdminAddBlog } from "./AdminAddBlog";

export const AdminBlog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddBlog = () => {
    navigate("/blogs/add");
  };

  return (
    <div>
      <h3 className="mb-4">Blog Management</h3>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={handleAddBlog}>
            Add New Blog
          </Button>
        </Col>
        <Col>
          <InputGroup>
            <FormControl placeholder="Search blogs..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
      <AdminBlogTable />
    </div>
  );
};
