import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'; 

const SignInOffcanvas = ({ show, handleClose }) => {
  const handleLinkClick = () => {
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Account</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <Nav className="flex-column">
        <Link to="/login" className="nav-link" onClick={handleLinkClick}>Sign In</Link>
        <Link to="/signup" className="nav-link" onClick={handleLinkClick}>Create Account</Link>
      </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SignInOffcanvas;
