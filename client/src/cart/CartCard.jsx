import { Link } from "react-router-dom";
import "./CartCard.css";

export default function CartCard({ id, productId, name, desc, price, img, quantity, categoryId, onRemove, onQuantityChange }) {

  const handleQuantityChange = (evt) => {
    const newQuantity = parseInt(evt.target.value);
    if (newQuantity >= 1) {
      onQuantityChange(id, newQuantity);
    }
  };

  const handleRemoveClick = (evt) => {
    evt.stopPropagation(); // Stop event propagation to prevent navigation
    evt.preventDefault(); // Prevent the default link action
    onRemove(id);
  };

  return (
    <li className="CartCard card">
      <Link to={`/${categoryId}/${productId}`} className="item-link">
        <div className="item-img-container">
          <img className="card-img" src={img} alt={name} />
        </div>
        <div className="card-body">
          <div className="cart-item-details">
            <div className="card-title">{name}</div>
            <div className="card-price">${price}</div>
            <div className="card-description">{desc}</div>
            <div className="card-quantity">Qty: {quantity}</div>
          </div>
        </div>
      </Link>
      
      <div className="item-quantity-container">
        <label htmlFor={`quantity-${id}`}>Edit Quantity:</label>
        <select 
          id={`quantity-${id}`} 
          value={quantity} 
          onChange={handleQuantityChange}
        >
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-danger mt-3" onClick={handleRemoveClick}>
        Remove
      </button>
    </li>
  );
}
