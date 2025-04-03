import React, { useState } from "react";
import { addPopup } from "../../../../utils/services/dashboard/PopupService";

export const AdminAddPopup = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: {
      title: "",
      discount: 0,
      subTitle: "",
      btnText: "",
      btnPath: ""
    },
    image_file: null,
    isPinned: false
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes("description.")) {
      const descField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        description: {
          ...prev.description,
          [descField]: type === "number" ? Number(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image_file: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", JSON.stringify(formData.description));
      formDataToSend.append("isPinned", formData.isPinned ? "1" : "0");
      if (formData.image_file) {
        formDataToSend.append("image_url", formData.image_file);
      }

      // You'll need to update your service function to handle FormData
      const response = await addPopup(formDataToSend);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: "",
        description: {
          title: "",
          discount: 0,
          subTitle: "",
          btnText: "",
          btnPath: ""
        },
        image_file: null,
        isPinned: false
      });
      setPreviewImage(null);
    } catch (err) {
      setError(err.message || "Failed to add popup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-add-popup">
      <h2>Add New Popup</h2>
      
      {success && (
        <div className="alert alert-success">
          Popup added successfully!
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Popup Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Popup Image</label>
          <input
            type="file"
            name="image_file"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="form-control"
          />
          {previewImage && (
            <div className="image-preview mt-2">
              <img 
                src={previewImage} 
                alt="Preview" 
                style={{ maxWidth: "200px", maxHeight: "200px" }} 
              />
            </div>
          )}
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            name="isPinned"
            checked={formData.isPinned}
            onChange={handleChange}
            className="form-check-input"
            id="isPinned"
          />
          <label className="form-check-label" htmlFor="isPinned">
            Pin this popup
          </label>
        </div>

        <h4>Description</h4>
        
        <div className="form-group">
          <label>Description Title</label>
          <input
            type="text"
            name="description.title"
            value={formData.description.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input
            type="number"
            name="description.discount"
            value={formData.description.discount}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input
            type="text"
            name="description.subTitle"
            value={formData.description.subTitle}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Button Text</label>
          <input
            type="text"
            name="description.btnText"
            value={formData.description.btnText}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Button Link</label>
          <input
            type="url"
            name="description.btnPath"
            value={formData.description.btnPath}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Popup"}
        </button>
      </form>
    </div>
  );
};