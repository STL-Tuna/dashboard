import React from "react";
import { Modal, Button, ListGroup, Badge, Row, Col } from "react-bootstrap";
import { 
  Person, 
  Envelope, 
  Telephone, 
  Calendar, 
  CardText,
  Building,
  GeoAlt,
  Tag 
} from "react-bootstrap-icons";

export const AdminContactView = ({ contact, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Contact Details <Badge bg="secondary">{contact.id}</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col xs={12} md={4} className="d-flex align-items-center">
                <Person className="me-2" />
                <div>
                  <h6 className="mb-0">Name:</h6>
                  <p className="mb-0">{contact.fullname}</p>
                </div>
              </Col>
              <Col xs={12} md={4} className="d-flex align-items-center">
                <Envelope className="me-2" />
                <div>
                  <h6 className="mb-0">Email:</h6>
                  <p className="mb-0">{contact.email}</p>
                </div>
              </Col>
              <Col xs={12} md={4} className="d-flex align-items-center">
                <Telephone className="me-2" />
                <div>
                  <h6 className="mb-0">Phone:</h6>
                  <p className="mb-0">{contact.contact_no}</p>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>

          {contact.category && (
            <ListGroup.Item className="d-flex align-items-center">
              <Tag className="me-2" />
              <div>
                <h6 className="mb-0">Category:</h6>
                <p className="mb-0">{contact.category}</p>
              </div>
            </ListGroup.Item>
          )}

          {contact.firm_name && (
            <ListGroup.Item className="d-flex align-items-center">
              <Building className="me-2" />
              <div>
                <h6 className="mb-0">Firm Name:</h6>
                <p className="mb-0">{contact.firm_name}</p>
              </div>
            </ListGroup.Item>
          )}

          <ListGroup.Item>
            <Row>
              <Col xs={12} md={4} className="d-flex align-items-center">
                <GeoAlt className="me-2" />
                <div>
                  <h6 className="mb-0">City:</h6>
                  <p className="mb-0">{contact.city}</p>
                </div>
              </Col>
              <Col xs={12} md={4} className="d-flex align-items-center">
                <GeoAlt className="me-2" />
                <div>
                  <h6 className="mb-0">Pin Code:</h6>
                  <p className="mb-0">{contact.pin_code}</p>
                </div>
              </Col>
              <Col xs={12} md={4} className="d-flex align-items-center">
                <Calendar className="me-2" />
                <div>
                  <h6 className="mb-0">Date Added:</h6>
                  <p className="mb-0">
                    {contact.createdAt && new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>

          {contact.purpose_of_enquiry && (
            <ListGroup.Item>
              <div className="d-flex">
                <CardText className="me-2 mt-1" />
                <div>
                  <h6>Purpose of Enquiry:</h6>
                  <p className="text-muted">{contact.purpose_of_enquiry}</p>
                </div>
              </div>
            </ListGroup.Item>
          )}

          {contact.type_of_customer && (
            <ListGroup.Item>
              <div className="d-flex">
                <CardText className="me-2 mt-1" />
                <div>
                  <h6>Type of Customer:</h6>
                  <p className="text-muted">{contact.type_of_customer}</p>
                </div>
              </div>
            </ListGroup.Item>
          )}

          {contact.description && (
            <ListGroup.Item>
              <div className="d-flex">
                <CardText className="me-2 mt-1" />
                <div>
                  <h6>Description:</h6>
                  <p className="text-muted">{contact.description}</p>
                </div>
              </div>
            </ListGroup.Item>
          )}

        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};