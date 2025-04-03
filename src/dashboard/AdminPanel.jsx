import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import { AdminNavbar } from "./components/Navbar";
import { AdminSidebar } from "./components/Sidebar";

export const AdminPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />
      <div
        style={{
          marginLeft: isCollapsed ? "80px" : "250px",
          padding: "1rem",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};
