import React, { useState } from "react";
import {
  Form,
  Button,
  ListGroup,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import {  Trash, Check, X } from "react-bootstrap-icons";
import { useCategory } from "../../../hooks/useCategory";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../utils/services/dashboard/CategoryService";

export const CategoryManager = () => {
  const { categories, loading, error, refetch } = useCategory();
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Handle adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      setActionLoading(true);
      await createCategory({
        name: newCategory,
        author: 2,
      });

      setNewCategory("");
      refetch();
    } catch (err) {
      console.error("Error adding category:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle updating a category
  const handleUpdateCategory = async (index) => {
    if (!editedCategoryName.trim()) return;

    try {
      setActionLoading(true);
      const category = categories[index];
      await updateCategory(category.id, {
        name: editedCategoryName,
      });

      cancelEdit();
    } catch (err) {
      console.error("Error updating category:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    try {
      setActionLoading(true);
      await deleteCategory(id);
      refetch();
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const startEdit = (index) => {
    setEditingCategory(index);
    setEditedCategoryName(categories[index].name);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setEditedCategoryName("");
  };

  console.log(categories);

  return (
    <div>
      <h4>Manage Categories</h4>
      {error && (
        <Alert variant="danger" onClose={() => refetch()} dismissible>
          Error loading categories: {error.message}
        </Alert>
      )}
      <Form onSubmit={handleAddCategory}>
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            disabled={actionLoading}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={loading || actionLoading}
        >
          {actionLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Add Category"
          )}
        </Button>
      </Form>
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" />
          <p>Loading categories...</p>
        </div>
      ) : (
        <ListGroup className="mt-3">
          {categories.map((item, index) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              {editingCategory === index ? (
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    disabled={actionLoading}
                  />
                  <Button
                    variant="success"
                    onClick={() => handleUpdateCategory(index)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? <Spinner size="sm" /> : <Check />}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={cancelEdit}
                    disabled={actionLoading}
                  >
                    <X />
                  </Button>
                </InputGroup>
              ) : (
                <>
                  {item.name}
                  <div>
                    {/* <Button
                      variant="link"
                      onClick={() => startEdit(index)}
                      disabled={actionLoading}
                    >
                      <Pencil />
                    </Button> */}
                    <Button
                      variant="link"
                      onClick={() => handleDeleteCategory(item.id)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? <Spinner size="sm" /> : <Trash />}
                    </Button>
                  </div>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
