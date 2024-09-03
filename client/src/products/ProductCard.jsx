import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import SignInModal from "../components/SignInModal";
import "./ProductCard.css"


export default function ProductCard({ id, name, price, image, category }) {
  const { currentUser, hasAddedToCart, addToCart, cartItems } = useContext(UserContext);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setAdded(hasAddedToCart(id));
  }, [id, hasAddedToCart, cartItems]);

  const handleQuantityChange = (evt) => {
    setQuantity(parseInt(evt.target.value, 10));
  };

  async function handleAddToCart(evt) {
    evt.preventDefault();
    if (!currentUser) {
      setShowModal(true);
      return;
    }
    if (added) return;
    const item = { id, name, price, image, category };
    await addToCart(currentUser, item, quantity);
    setAdded(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  
  return (
    <li className="ProductCard">
      <Link className="product-link card" to={`/${category}/${id}`}>
        <div className="product-img-container">
          <img src={image} alt={name} className="card-img" />
        </div>
        <div className="card-body">
          <div className="product-item-details">
            <div className="card-title">{name}</div>
            <div className="card-price">${price}</div>
          </div>
        </div>
      </Link>

      {!added && (
        <div className="quantity-selector">
          <label htmlFor={`quantity-${id}`}>Quantity: </label>
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
      )}
      
      <button 
        className="btn"
        onClick={handleAddToCart} 
        disabled={added}
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
      <SignInModal show={showModal} handleClose={handleCloseModal} />
    </li>
  );
}