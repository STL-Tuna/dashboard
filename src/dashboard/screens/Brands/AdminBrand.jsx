import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { useBrand } from "../../../hooks/useBrand";
import { deleteBrand } from "../../../utils/services/dashboard/BrandService";
import { AdminEditBrand } from "./AdminEditBand";

export const AdminBrand = () => {
  const { brands } = useBrand();
  const navigate = useNavigate();

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (data) => {
    setSelectedBrand(data);
    setShowEditModal(true);
  };

  const handleAddBrand = () => {
    navigate("/brands/add");
  };

  const handleDeleteBrand = async (id) => {
    let result = confirm("Are you sure you want to delete this brand?");
    if (result === true) {
      let response = await deleteBrand(id);
      if (response.status === 200) {
        alert("Brand deleted successfully");
        window.location.reload();
      } else {
        alert("Unable to delete Brand");
      }
    }
  };

  return (
    <div>
      <h3 className="mb-4">Brand Management</h3>
      <Button variant="primary" onClick={handleAddBrand} className="mb-4">
        Add New Brand
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Brand Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.brand_name}</td>
              <td>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-danger"
                  onClick={() => handleDeleteBrand(item.id)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Brand Modal */}
      {selectedBrand && (
        <AdminEditBrand
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          item={setSelectedBrand}
        />
      )}
    </div>
  );
};
