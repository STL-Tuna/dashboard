import React from "react";
import { Table } from "react-bootstrap";

import { useSubscriber } from "../../../hooks/useSubscriber";
export const AdminUserTable = () => {
  const { subscriber, loading, error } = useSubscriber();

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {subscriber.map((item, index) => (
          <tr key={item.id}>
            <td>1</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
