import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faHeart, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  // Toggle for offcanvas menu
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);
  const handleOffCanvasClose = () => setShowOffCanvas(false);


  const logout = () => {
    
    navigate('/login'); 
   };

  return (
    <Navbar expand="lg" className="mb-3 sticky-top">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">Social Food Posting</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={toggleOffCanvas} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showOffCanvas}
          onHide={handleOffCanvasClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Social Food Posting</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={NavLink} to="/feed" onClick={handleOffCanvasClose}><FontAwesomeIcon icon={faHome} /> Feed</Nav.Link>
              <Nav.Link as={NavLink} to="/search" onClick={handleOffCanvasClose}><FontAwesomeIcon icon={faSearch} /> Search</Nav.Link>
              <Nav.Link as={NavLink} to="/liked" onClick={handleOffCanvasClose}><FontAwesomeIcon icon={faHeart} /> Liked</Nav.Link>
              <Nav.Link as={NavLink} to="/create" onClick={handleOffCanvasClose}><FontAwesomeIcon icon={faPlus} /> Create</Nav.Link>
              <Nav.Link onClick={() => { logout(); handleOffCanvasClose(); }}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
