import React, { useState } from "react";
import {
  Form,
  Button,
  ListGroup,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Tag, Pencil, Trash, Check, X } from "react-bootstrap-icons";
import { useTag } from "../../../hooks/useTags";
import {
  createTag,
  deleteTag,
} from "../../../utils/services/dashboard/TagService";

export const TagManager = () => {
  const { tag, loading, error, refetch } = useTag();

  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [editedTagName, setEditedTagName] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Handle adding a new tag
  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      setActionLoading(true);
      await createTag({
        name: newTag,
        author: 2,
      });

      setNewTag("");
      refetch();
    } catch (err) {
      console.error("Error adding category:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      setActionLoading(true);
      await deleteTag(id);
      refetch();
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <h4>Manage Tags</h4>

      {error && (
        <Alert variant="danger">Error loading tags: {error.message}</Alert>
      )}

      <Form onSubmit={handleAddTag}>
        <Form.Group className="mb-3">
          <Form.Label>Tag Name</Form.Label>
          <Form.Control
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={loading || actionLoading}
        >
          {actionLoading ? <Spinner animation="border" size="sm" /> : "Add Tag"}
        </Button>
      </Form>

      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" />
          <p>Loading tags...</p>
        </div>
      ) : (
        <ListGroup className="mt-3">
          {tag.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {editingTag === index ? (
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={editedTagName}
                    onChange={(e) => setEditedTagName(e.target.value)}
                  />
                  <Button variant="success">
                    <Check />
                  </Button>
                  <Button variant="danger">
                    <X />
                  </Button>
                </InputGroup>
              ) : (
                <>
                  {item.name}
                  <div>
                    {/* <Button variant="link">
                      <Pencil />
                    </Button> */}
                    <Button
                      variant="link"
                      onClick={() => handleDeleteTag(item.id)}
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
