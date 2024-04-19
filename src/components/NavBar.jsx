import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faHeart, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  // Your logic for currentUser, totalItems, setSearchTerm, and logout

  // OffCanvas menu
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);
  const handleOffCanvasClose = () => setShowOffCanvas(false);

  return (
    <Navbar expand="lg" className="mb-3 sticky-top">
      <Container fluid>
        <Navbar.Brand href="/">Future Fwd Agency</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={toggleOffCanvas}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showOffCanvas}
          onHide={handleOffCanvasClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Future Fwd Agency
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* Your user info */}
              {/* Your search bar */}
              <Nav.Link href="/feed"><FontAwesomeIcon icon={faHome} /> Feed</Nav.Link>
              <Nav.Link href="/search"><FontAwesomeIcon icon={faSearch} /> Search</Nav.Link>
              <Nav.Link href="/liked"><FontAwesomeIcon icon={faHeart} /> Liked</Nav.Link>
              <Nav.Link href="/create"><FontAwesomeIcon icon={faPlus} /> Create</Nav.Link>
              <Nav.Link onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
