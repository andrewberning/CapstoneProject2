import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const UserOffcanvas = ({ show, handleClose, logout }) => {
  const handleLinkClick = () => {
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Account Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Link to={"/account"} className='nav-link' onClick={handleLinkClick}>Account Info</Link>
          <Link to="#" className='nav-link' onClick={logout}>Logout</Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserOffcanvas;
