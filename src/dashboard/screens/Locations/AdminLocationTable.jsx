import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { useLocation } from "../../../hooks/useLocations";
import { deleteLocation } from "../../../utils/services/dashboard/LocationService";

export const AdminLocationTable = () => {
  const navigate = useNavigate();
  const { location, loading, error } = useLocation();

  const handleEditLocation = (location) => {
    navigate(`/locations/edit-location/${location.id}`, {
      state: { locationData: location },
    });
  };

  const handleDeleteImage = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        await deleteLocation(id);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  if (loading) return <div>Loading locations...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Province</th>
            <th>District</th>
            <th>Municipality</th>
            <th>Address</th>
            <th>Coordinates</th>
            <th>Contact No</th>
            <th>Timing</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {location.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.locationBrands.brand_name}</td>
              <td>{item.province}</td>
              <td>{item.district}</td>
              <td>{item.municipality}</td>
              <td>{item.address}</td>
              <td>
                {item.coordinates.lat} | {item.coordinates.long}
              </td>
              <td>{item.phone_no}</td>
              <td>
                <Badge bg="warning">
                  {item.timing.opening} - {item.timing.closing}
                </Badge>
              </td>
              <td>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleEditLocation(item)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-danger"
                  onClick={() => handleDeleteImage(item.id)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
