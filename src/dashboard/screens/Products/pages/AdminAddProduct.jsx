import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { createProduct } from "../../../../utils/services/dashboard/ProductService";
import { useCategory } from "../../../../hooks/useCategory";
import { useBrand } from "../../../../hooks/useBrand";
import { useColor } from "../../../../hooks/useColor";

export const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    author_id: "" || 1,
    category_id: "",
    tags: [],
    description: "",
    content: "",
    specification: "",
    brands: "",
    colors: [],
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [colorVariants, setColorVariants] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tagInput, setTagInput] = useState("");

  const handleContentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSpecificationChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      specification: value,
    }));
  };

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategory();
  const {
    brands: brandList,
    loading: brandsLoading,
    error: brandsError,
  } = useBrand();
  const {
    colors: colorList,
    loading: colorsLoading,
    error: colorsError,
  } = useColor();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTags = () => {
    if (tagInput.trim()) {
      const newTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0 && !formData.tags.includes(tag));

      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, ...newTags],
      }));

      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleFeaturedImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const removeAdditionalImage = (index) => {
    const updatedImages = [...additionalImages];
    updatedImages.splice(index, 1);
    setAdditionalImages(updatedImages);
  };

  const handleAdditionalImagesChange = (e) => {
    if (e.target.files) {
      setAdditionalImages([...additionalImages, ...Array.from(e.target.files)]);
    }
  };

  const addColorVariant = () => {
    setColorVariants([
      ...colorVariants,
      {
        color_id: "",
        color_image: null,
        price_adjustment: 0,
        stock: 0,
      },
    ]);
  };

  const removeColorVariant = (index) => {
    const updated = [...colorVariants];
    updated.splice(index, 1);
    setColorVariants(updated);
  };

  const handleColorChange = (index, field, value) => {
    const updated = [...colorVariants];
    updated[index][field] = value;
    setColorVariants(updated);
  };

  const handleColorImageChange = (index, e) => {
    const updated = [...colorVariants];
    updated[index].color_image = e.target.files[0];
    setColorVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!featuredImage) {
      setError("Featured image is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append all basic fields
      Object.keys(formData).forEach((key) => {
        if (key === "tags") {
          // Send tags as array
          formData.tags.forEach((tag) => formDataToSend.append("tags[]", tag));
        } else if (key !== "colors") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append featured image
      formDataToSend.append("featured_image", featuredImage);

      // Append additional images
      // additionalImages.forEach((image) => {
      //   formDataToSend.append("images", image);
      // });
      additionalImages.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });

      // Append color variants
      colorVariants.forEach((variant, index) => {
        formDataToSend.append(`colors[${index}][color_id]`, variant.color_id);
        formDataToSend.append(
          `colors[${index}][price_adjustment]`,
          variant.price_adjustment
        );
        formDataToSend.append(`colors[${index}][stock]`, variant.stock);

        // Append color image if exists
        if (variant.color_image) {
          formDataToSend.append(`color_images`, variant.color_image);
        }
      });

      // Create product
      await createProduct(formDataToSend);

      setSuccess("Product created successfully!");
      // Reset form
      setFormData({
        title: "",
        author_id: "",
        category_id: "",
        tags: [],
        description: "",
        content: "",
        specification: "",
        brands: "",
        colors: [],
      });
      setTagInput("");
      setFeaturedImage(null);
      setAdditionalImages([]);
      setColorVariants([]);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to create product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create New Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category*</Form.Label>
              {categoriesLoading ? (
                <Spinner animation="border" size="sm" />
              ) : categoriesError ? (
                <Alert variant="danger">Failed to load categories</Alert>
              ) : (
                <Form.Select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div className="d-flex mb-2">
                <Form.Control
                  type="text"
                  placeholder="Enter tags separated by commas"
                  value={tagInput}
                  onChange={handleTagsChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={addTags}
                  className="ms-2"
                >
                  Add Tags
                </Button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="badge bg-primary">
                    {tag}
                    <button
                      type="button"
                      className="ms-2 btn-close btn-close-white"
                      onClick={() => removeTag(index)}
                      aria-label="Remove"
                    />
                  </span>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content*</Form.Label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Enter detailed description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specification*</Form.Label>
              <ReactQuill
                theme="snow"
                value={formData.specification}
                onChange={handleSpecificationChange}
                placeholder="Enter detailed description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand*</Form.Label>
              {brandsLoading ? (
                <Spinner animation="border" size="sm" />
              ) : brandsError ? (
                <Alert variant="danger">Failed to load brands</Alert>
              ) : (
                <Form.Select
                  name="brands"
                  value={formData.brands}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a brand</option>
                  {brandList.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.brand_name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            <div className="mb-3">
              <Button variant="outline-primary" onClick={addColorVariant}>
                Add Color Variant
              </Button>

              {colorVariants.map((variant, index) => (
                <div key={index} className="border p-3 mt-3">
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Color*</Form.Label>
                        {colorsLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : colorsError ? (
                          <Alert variant="danger">Failed to load colors</Alert>
                        ) : (
                          <Form.Select
                            value={variant.color_id}
                            onChange={(e) =>
                              handleColorChange(
                                index,
                                "color_id",
                                e.target.value
                              )
                            }
                            required
                          >
                            <option value="">Select a color</option>
                            {colorList.map((color) => (
                              <option key={color.id} value={color.id}>
                                {color.name}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price Adjustment</Form.Label>
                        <Form.Control
                          type="number"
                          step="0.01"
                          value={variant.price_adjustment}
                          onChange={(e) =>
                            handleColorChange(
                              index,
                              "price_adjustment",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                          type="number"
                          value={variant.stock}
                          onChange={(e) =>
                            handleColorChange(
                              index,
                              "stock",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeColorVariant(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Color Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleColorImageChange(index, e)}
                      accept="image/*"
                    />
                    {variant.color_image && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(variant.color_image)}
                          alt="Color preview"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </div>
                    )}
                  </Form.Group>
                </div>
              ))}
            </div>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Featured Image*</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFeaturedImageChange}
                accept="image/*"
                required
              />
              {featuredImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(featuredImage)}
                    alt="Featured preview"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleAdditionalImagesChange}
                accept="image/*"
              />
              <div className="mt-2">
                {additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className="mb-2 position-relative d-inline-block me-2"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Additional preview ${index + 1}`}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                      className="img-thumbnail"
                    />
                    <button
                      type="button"
                      className="btn-close position-absolute top-0 end-0 bg-danger"
                      onClick={() => removeAdditionalImage(index)}
                      aria-label="Remove"
                      style={{ transform: "translate(30%, -30%)" }}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-100 mt-3"
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Creating Product...</span>
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
