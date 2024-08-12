import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const SignInOffcanvas = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Account</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Item>
          <Nav.Link href="/login">Sign In</Nav.Link>
          </Nav.Item>
          <Link to="/signup">Create Account</Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SignInOffcanvas;
