import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartCard from './CartCard';
import UserContext from '../auth/UserContext';
import ShoplyApi from '../api/api';
import "./CartList.css";

export default function CartList() {
  const { currentUser, cartItems, setCartItems, totalAmount, totalItems, removeFromCart } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const cartData = await ShoplyApi.getCartItems(currentUser.cartId);
      setCartItems(cartData);
    }

    fetchData();
  }, [])

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await ShoplyApi.updateCartItemQuantity(itemId, newQuantity);
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      console.error("Error updating item quantity", err);
    }
  };

  return (
    <div className="CartList">
      <div className="cart-title-container">
        <h2>{currentUser.firstName}'s Cart</h2>
      </div>
      
      <div className="cart-details-container">
        <div className='cart-items-container'>
          <h2>Cart Items</h2>
          {cartItems.length > 0 ? (
            <ul className="items-list">
              {cartItems.map(item => (
                <CartCard 
                  key={item.id}
                  id={item.id}
                  productId={item.product_id}
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                  img={item.image_url}
                  quantity={item.quantity}
                  categoryId={item.category_id}
                  onRemove={removeFromCart}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </ul>
          ) : <h2>Your cart is empty</h2>
          }
        </div>
        <div className="order-summary-container">
          <div className="order-summary-title">
            <h4>Order Summary</h4>
          </div>
          <div className="order-summary-total">
            <p>Number of items: {totalItems}</p>
            <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          </div>
          <Link to="/checkout" className="btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}