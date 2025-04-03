import React from "react";
import { Link } from "react-router-dom";
import { Nav, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  House,
  Journal,
  People,
  ChevronLeft,
  ChevronRight,
  FileBarGraph,
  Hash,
  Basket,
  CardImage,
  GeoAlt,
  Envelope,
  Camera2,
  FileEarmarkPdf,
  EnvelopeCheck,
  Megaphone,
  Palette,
  Building,
} from "react-bootstrap-icons";
import sidebarItems from "../../utils/json/admin-sidebar.json";

// Map icon names to components
const iconComponents = {
  House: House,
  Hash: Hash,
  Journal: Journal,
  People: People,
  FileBarGraph: FileBarGraph,
  Basket: Basket,
  CardImage: CardImage,
  GeoAlt: GeoAlt,
  Envelope: Envelope,
  Camera2: Camera2,
  FileEarmarkPdf: FileEarmarkPdf,
  EnvelopeCheck: EnvelopeCheck,
  Megaphone: Megaphone,
  Palette: Palette,
  Building: Building,
};

export const AdminSidebar = ({ isCollapsed, toggleSidebar }) => {
  // Tooltip for collapsed state
  const renderTooltip = (name) => (
    <Tooltip id={`tooltip-${name}`}>{name}</Tooltip>
  );

  return (
    <div
      style={{
        width: isCollapsed ? "80px" : "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#343a40",
        color: "white",
        padding: "1rem",
        transition: "width 0.3s ease",
      }}
    >
      {/* Toggle Button */}
      <Button
        variant="link"
        onClick={toggleSidebar}
        style={{
          color: "white",
          marginBottom: "1rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </Button>

      {/* Sidebar Links */}
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/"
          className="mb-2 text-reset"
          style={{ whiteSpace: "nowrap" }}
        >
          <House className="me-2" />
          {!isCollapsed && "Dashboard"}
        </Nav.Link>
        {sidebarItems.items
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            const IconComponent = iconComponents[item.icon];
            return (
              <OverlayTrigger
                key={item.id}
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(item.name)}
              >
                <Nav.Link
                  as={Link}
                  to={item.path}
                  className="mb-2 text-reset"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {IconComponent && <IconComponent className="me-2" />}
                  {!isCollapsed && item.name}
                </Nav.Link>
              </OverlayTrigger>
            );
          })}
      </Nav>
    </div>
  );
};
