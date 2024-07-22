import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import "./ProductCard.css"


export default function ProductCard({ id, name, price, image, category }) {
  const { currentUser, hasAddedToCart, addToCart } = useContext(UserContext);
  const [added, setAdded] = useState(false);

  useEffect(function updateCartStatus() {
    setAdded(hasAddedToCart(id))
  }, [id, hasAddedToCart]);

  async function handleAddToCart(evt) {
    evt.preventDefault();
    if (added) return;


    const item = { id, name, price, image, category };
    addToCart(currentUser, item, 1);
    setAdded(true);
  }
  
  return (
    <div className="ProductCard card d-flex flex-column">
      <Link className="product-link" to={`/${category}/${id}`}>
        <div className="product-img-container">
          <img src={image} className="card-img" />
        </div>
        <div className="card-body">
          <div className="cart-item-details">
            <div className="card-title">{name}</div>
            <div className="card-price">${price}</div>
          </div>
        </div>
      </Link>
      <button 
        className="btn btn-primary mt-2"
        onClick={handleAddToCart} 
        disabled={added}
      >
        {added ? "Added" : "Add to cart"}
      </button>
    </div>
  );
}