import { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import SignInOffcanvas from "./SignInOffcanvas";
import LogOutOffcanvas from "./LogOutOffcanvas";
import SearchForm from "../components/SearchForm";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from "react-bootstrap/Offcanvas";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navigation.css";

export default function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => setShowSignIn(true);

  const handleUserMenuClose = () => setShowUserMenu(false);
  const handleUserMenuShow = () => setShowUserMenu(true);

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  }

  return (
    <Navbar expand={false} className="bg-body-tertiary">
    <Container fluid>
      <Row className="w-100 align-items-center">
        <Col xs="auto">
          <Navbar.Brand href="/">Shoply</Navbar.Brand>
        </Col>
        <Col xs="auto">
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleOffcanvasShow} />
        </Col>
        <Col className="flex-grow-1">
          <SearchForm />
        </Col>
        <Col xs="auto">
          <Nav className="ms-auto">
            {currentUser 
             ? <Nav.Link href="" onClick={handleUserMenuShow}>
               <FontAwesomeIcon icon={faUser} /> {currentUser.username}
               </Nav.Link>
             : <Nav.Link href="" onClick={handleSignInShow}>Sign In</Nav.Link>
            }
            
          </Nav>
        </Col>
        <Col xs="auto">
          <Nav className="ms-auto">
            <Nav.Link href="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
    <Navbar.Offcanvas
      id="offcanvasNavbar-expand"
      show={showOffcanvas}
      onHide={handleOffcanvasClose}
      aria-labelledby="offcanvasNavbarLabel"
      placement="start"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel-expand">Shoply</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="me-auto">
          <NavDropdown title="Categories" id="offcanvasNavbarDropdown-expand">
            <NavDropdown.Item href="/categories/clothing">Clothing</NavDropdown.Item>
            <NavDropdown.Item href="/categories/electronics">Electronics</NavDropdown.Item>
            <NavDropdown.Item href="/categories/toys">Toys</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>

    {/* Sign In Offcanvas */}
    <SignInOffcanvas show={showSignIn} handleClose={handleSignInClose} />

    <LogOutOffcanvas show={showUserMenu} handleClose={handleUserMenuClose} logout={handleLogout} />
  </Navbar>
  );
}