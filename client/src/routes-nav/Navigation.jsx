import { useState, useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import SignInOffcanvas from "./SignInOffcanvas";
import LogOutOffcanvas from "./LogOutOffcanvas";
import SearchForm from "../components/SearchForm";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from "react-bootstrap/Offcanvas";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navigation.css";

export default function Navigation() {
  const { currentUser, categories, cartItems, totalItems, setTotalItems, logout } = useContext(UserContext);
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

  useEffect(() => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(itemCount);
  }, [cartItems, setTotalItems]);

  return (
    <Navbar expand={false} >
    <Container fluid>
      <Row className="w-100 align-items-center">
        <Col xs="auto">
          <Navbar.Brand href="/">Shoply</Navbar.Brand>
        </Col>
        <Col xs="auto">
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleOffcanvasShow} />
        </Col>
        <Col className="search-container">
          <SearchForm />
        </Col>
        <Col xs="auto">
          <Nav className="ms-auto">
            {currentUser 
             ? <Nav.Link id="user-link" href="" onClick={handleUserMenuShow}>
               <FontAwesomeIcon icon={faUser} /> {currentUser.username}
               </Nav.Link>
             : <Nav.Link id="user-link" href="" onClick={handleSignInShow}>Sign In</Nav.Link>
            }
          </Nav>
        </Col>
        <Col className="cart-nav" xs="auto">
          <Nav className="ms-auto">
            <Link to="/cart" id="cart-link" className="nav-link position-relative">
            <FontAwesomeIcon icon={faShoppingCart} />
            {totalItems > 0 && (
              <span id="cart-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                {totalItems}
              </span>
            )}
            </Link>
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
        <Offcanvas.Title id="offcanvasNavbarLabel-expand">
          <Link to={"/"} className="nav-link" onClick={handleOffcanvasClose}>
            Shoply
          </Link>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="me-auto flex-column">
          {/* Link to the categories list page */}
          <Nav.Link as="div">
            <Link to="/categories" className="nav-link" onClick={handleOffcanvasClose}>
              Categories
            </Link>
          </Nav.Link>

          {/* List all categories as links */}
          {categories.map((category) => (
            <Nav.Link as="div" key={category.id}>
              <Link 
                to={`/categories/${category.name}`} 
                className="nav-link ms-3"
                onClick={handleOffcanvasClose}
              >
                {category.name}
              </Link>
            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>

    {/* Sign In Offcanvas */}
    <SignInOffcanvas show={showSignIn} handleClose={handleSignInClose} />

    <LogOutOffcanvas show={showUserMenu} handleClose={handleUserMenuClose} logout={handleLogout} />
  </Navbar>
  );
}