import { Link } from 'react-router-dom';
import "./ConfirmationPage.css";

export default function ConfirmationPage() {
  return (
    <div className="ConfirmationPage">
      <h2 className="text-center my-4">Confirmation Page</h2>
      <div className="confirmation-container card p-4 shadow-sm">
        <div className="confirmation-details">
          <p className="mb-4">Your order has been received!</p>
          <p className="mb-4">Thanks for Shopping with us at Shoply!</p>
        </div>
        <div className="btn-container">
          <Link to={"/"} className="btn">Home</Link>
        </div>
      </div>
    </div>
  )
}