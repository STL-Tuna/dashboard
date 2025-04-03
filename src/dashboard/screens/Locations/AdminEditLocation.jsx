import React, { useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../utils/api";

export const AdminEditLocation = () => {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const locationData = locationState?.locationData;

  const [selectedBrand, setSelectedBrand] = useState({
    id: locationData?.brand_id || null,
    name: locationData?.locationBrands?.brand_name || "",
  });
  const [brandQuery, setBrandQuery] = useState(
    locationData?.locationBrands?.brand_name || ""
  );
  const [brands, setBrands] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({
    province: locationData?.province || "",
    district: locationData?.district || "",
    municipality: locationData?.municipality || "",
    address: locationData?.address || "",
    phone_no: locationData?.phone_no || "",
    timing: locationData?.timing || { opening: "", closing: "" },
    coordinates: locationData?.coordinates || { lat: "", long: "" },
  });

  const debounceTimer = useRef(null);

  useEffect(() => {
    if (!locationData) {
      navigate("/locations");
    }
  }, [locationData, navigate]);

  useEffect(() => {
    const fetchBrands = async (query) => {
      if (!query.trim()) {
        setBrands([]);
        return;
      }
      try {
        setIsSearching(true);
        const response = await api.get(`/brands?q=${query}`);
        setBrands(response.data.items);
      } catch (error) {
        console.error("Error fetching brands", error);
        setBrands([]);
      } finally {
        setIsSearching(false);
      }
    };

    if (brandQuery.trim() && brandQuery !== selectedBrand.name) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        fetchBrands(brandQuery);
      }, 500); // Debounce delay
    } else {
      setBrands([]);
    }

    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [brandQuery, selectedBrand.name]);

  const handleBrandSearchChange = (e) => {
    setBrandQuery(e.target.value);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand({
      id: brand.id,
      name: brand.brand_name || brand.title || "Unnamed Brand",
    });
    setBrandQuery(brand.brand_name || brand.title);
    setBrands([]); // Clear brands after selection
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("timing.")) {
      setFormData((prev) => ({
        ...prev,
        timing: { ...prev.timing, [name.split(".")[1]]: value },
      }));
    } else if (name.includes("coordinates.")) {
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name.split(".")[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if brand is selected
    if (!selectedBrand.id) {
      alert("Please select a brand.");
      return;
    }

    // Prepare form data and submit
    const data = { brand_id: selectedBrand.id, ...formData };

    try {
      const response = await api.put(`/location/${locationData.id}`, data);
      console.log("Location updated successfully:", response.data);
      alert("Location updated successfully!");
      navigate("/locations"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating location:", error);
      alert("Error updating location!");
    }
  };

  return (
    <div>
      <h3 className="mb-4">Update Location</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" style={{ position: "relative" }}>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search for a brand"
            value={brandQuery}
            onChange={handleBrandSearchChange}
            autoComplete="off"
          />

          {isSearching && (
            <div className="mt-2 text-muted">Searching brands...</div>
          )}

          {brands.length > 0 && (
            <div
              className="mt-1 border rounded bg-white"
              style={{
                position: "absolute",
                width: "100%",
                zIndex: 1000,
                maxHeight: "200px",
                overflowY: "auto",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => handleBrandSelect(brand)}
                  className="px-3 py-2 hover-bg-light"
                  style={{ cursor: "pointer" }}
                >
                  {brand.brand_name || brand.title || "Unnamed Brand"}
                </div>
              ))}
            </div>
          )}

          {brandQuery &&
            !isSearching &&
            brands.length === 0 &&
            !selectedBrand.id && (
              <div className="mt-2 text-muted">No brands found</div>
            )}
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Province</Form.Label>
              <Form.Control
                as="select"
                name="province"
                value={formData.province}
                onChange={handleChange}
              >
                <option value="">Select Province</option>
                <option value="Bagmati">Bagmati</option>
                <option value="Gandaki">Gandaki</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                as="select"
                name="district"
                value={formData.district}
                onChange={handleChange}
              >
                <option value="">Select District</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Pokhara">Pokhara</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Municipality</Form.Label>
              <Form.Control
                as="select"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
              >
                <option value="">Select Municipality</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Pokhara">Pokhara</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_no"
                placeholder="Enter Phone Number"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Opening Time</Form.Label>
              <Form.Control
                type="time"
                name="timing.opening"
                value={formData.timing.opening}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Closing Time</Form.Label>
              <Form.Control
                type="time"
                name="timing.closing"
                value={formData.timing.closing}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                name="coordinates.lat"
                placeholder="Enter Latitude"
                value={formData.coordinates.lat}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="coordinates.long"
                placeholder="Enter Longitude"
                value={formData.coordinates.long}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="me-2">
          Update Location
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/locations")}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};
