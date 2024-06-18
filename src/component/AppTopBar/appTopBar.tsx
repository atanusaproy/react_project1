import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const pages = [
  {
    menuName: 'Products',
    link: '/',
  },
  {
    menuName: 'Pricing',
    link: '/pricing',
  },
  {
    menuName: 'Blog',
    link: '/blog',
  },
];

function AppTopBar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home">
          Royz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggleOffcanvas} />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
          placement="end"
          aria-labelledby="offcanvasNavbarLabel"
          aria-controls="offcanvasNavbar"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Royz
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              {pages.map((page) => (
                <Nav.Link key={page.menuName} as={Link} to={page.link}>
                  {page.menuName}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default AppTopBar;
