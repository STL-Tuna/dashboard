import React from "react";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";

import { AdminProductTable } from "./AdminProductTable";
import { Link } from "react-router-dom";

export const AdminProduct = () => {
  return (
    <>
      <h3 className="mb-4">Product Management</h3>
      <Row className="mb-4">
        <Col>
          <Link to="/products/add">
            <Button variant="primary">Add New Product</Button>
          </Link>
        </Col>
        <Col>
          <InputGroup>
            <FormControl placeholder="Search products..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
      <AdminProductTable />
    </>
  );
};
