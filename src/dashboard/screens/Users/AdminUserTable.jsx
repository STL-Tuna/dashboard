import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

import { useUsers } from "../../../hooks/useUsers";
export const AdminUserTable = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Phone no.</th>
          <th>Status</th>
          <th>Registered At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>1</td>
            <td>{user.fullname}</td>
            <td>{user.email}</td>
            <td>{user.phoneNo}</td>
            <td>
              <Badge bg="secondary">{user.status}</Badge>
            </td>
            <td>{user.createdAt}</td>
            <td>
              {/* <Button variant="link" size="sm">
                <Eye />
              </Button> */}
              {/* <Button variant="link" size="sm">
                <Pencil />
              </Button> */}
              <Button variant="link" size="sm" className="text-danger">
                <Trash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
