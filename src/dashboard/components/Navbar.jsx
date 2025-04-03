import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

function clearAllAuthCookies() {
  const cookieNames = ['auth_token', 'session', 'token'];
  
  const targetDomains = [
    'stlnpl.com',            // root domain
    '.stlnpl.com',           // subdomains
    'account.stlnpl.com',    // specific subdomain
    '.account.stlnpl.com'    // sub-subdomains if any
  ];

  // Paths where cookies might be set
  const paths = ['/', '/dashboard'];

  // Clear cookies for each combination
  cookieNames.forEach(name => {
    targetDomains.forEach(domain => {
      paths.forEach(path => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=${path};`;
      });
    });
    
    // Also clear without domain specification
    paths.forEach(path => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
    });
  });

  console.log('Cookies after clearing:', document.cookie);
}

function logout() {
  clearAllAuthCookies();
  localStorage.clear();
  sessionStorage.clear();
  
  // Force reload with cache busting
  window.location.href = `https://stlnpl.com`;
}

export const AdminNavbar = ({ onToggleSidebar }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="ms-3">
          Dashboard
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="https://stlnpl.com" target="_blank" rel="noopener noreferrer">
              Visit Site
            </Nav.Link>

            <NavDropdown
              title={
                <span>
                  <PersonCircle size={24} />
                </span>
              }
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/dashboard/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {/* Logout item */}
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
