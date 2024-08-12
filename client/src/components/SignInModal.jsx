import { Link } from "react-router-dom";

export default function SignInModal({ show, handleClose }) {
  if (!show) return null;

  return (
    <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign In Required</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>You need to sign in or register an account to add items to the cart.</p>
          </div>
          <div className="modal-footer">
            <Link to="/login" className="btn btn-primary" onClick={handleClose}>Sign In</Link>
            <Link to="/signup" className="btn btn-secondary" onClick={handleClose}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
