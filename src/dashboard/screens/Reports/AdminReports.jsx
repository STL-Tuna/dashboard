import React, {useState} from "react";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
// import { AdminBlogTable } from "./AdminBlogTable";
import { AdminAddReport } from "./AdminAddReport";

export const AdminReport = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddReport = () => {
    setShowAddModal(true);
  };

  return (
    <div>
      <h3 className="mb-4">Report Management</h3>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={handleAddReport}>Upload Report</Button>
        </Col>
        <Col>
          <InputGroup>
            <FormControl placeholder="Search reports..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
      {/* <AdminBlogTable /> */}
      <AdminAddReport show={showAddModal} onHide={() => setShowAddModal(false)} />
    </div>
  );
};
