import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import { useContacts } from "../../../hooks/useContact";
import { AdminContactView } from "./AdminContactView";
import context from "react-bootstrap/esm/AccordionContext";

export const AdminContactTable = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const { contacts, loading, error } = useContacts();

  if (loading) return <div>Loading Contact...</div>;
  if (error) return <div>Error: {error}</div>;

  if (context.length === 0) return <p>Nothing to Display</p>;

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{item.contact_no}</td>
              <td>
                <Badge bg="warning"> {item.status}</Badge>
              </td>
              <td>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleViewContact(item)}
                >
                  <Eye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedContact && (
        <AdminContactView
          contact={selectedContact}
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
        />
      )}
    </>
  );
};
