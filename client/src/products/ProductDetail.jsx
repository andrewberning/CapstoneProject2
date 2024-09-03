import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ShoplyApi from "../api/api";
import UserContext from "../auth/UserContext";
import SignInModal from "../components/SignInModal";
import "./ProductDetail.css";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductDetail() {
  const { id, category } = useParams();
  const { currentUser, hasAddedToCart, addToCart, cartItems } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getProduct() {
      const productData = await ShoplyApi.getProduct(id, category);
      setProduct(productData);
    }

    getProduct();
  }, [id, category]);

  useEffect(() => {
    // Ensure the product is checked properly
    if (product) {
      const cartQuantity = hasAddedToCart(product.id);
      if (cartQuantity > 0) {
        setAdded(true);
        setQuantity(cartQuantity);
      }
      // setAdded(hasAddedToCart(product.id));
    }
  }, [product, hasAddedToCart, cartItems]);

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
    await addToCart(currentUser, product, quantity);
    setAdded(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  if (!product) return <LoadingSpinner />;

  return (
    <div className="ProductDetail">
      <div className="product-container">
        <div className="product-img-container">
          <img src={product.image_url} className="product-img" alt={product.name} />
        </div>

        <div className="product-details-container">
          <div className="product-details">
            <div className="product-title">
              <p>{product.name}</p>
            </div>
            <div className="product-card-text">
              <p>{product.description}</p>
            </div>
            <div className="product-card-price">
              <p>${product.price}</p>
            </div>
          </div>
        

          <div className="add-to-cart-container">
          {!added && (
            <div className="quantity-selector">
              <label htmlFor={`quantity-${id}`}>Quantity:</label>
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
          </div>
        </div>
      </div>



      <SignInModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}
