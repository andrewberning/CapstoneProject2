import { useContext } from 'react';
import CartCard from './CartCard';
import UserContext from '../auth/UserContext';

export default function CartList() {
  const { cartItems } = useContext(UserContext);

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    let totalPrice = 0;

    // Iterate through each item and sum up the prices
    items.forEach(item => {
      // Extract numerical value from price string (remove '$' and parse as float)
      const price = parseFloat(item.price.replace('$', ''));
      totalPrice += price;
    });

    // Return the total price rounded to 2 decimal places
    return totalPrice.toFixed(2);
  };

  return (
    <div className="CartList">
      <div className="cart-title text-center">
        <h2>Cart</h2>
      </div>
      
      <div className='d-flex'>
        {cartItems.length > 0 ? (
          <div className="cart-list-container w-50">
            <div className="cartItemsList d-flex flex-column">
              {cartItems.map(item => (
                <CartCard 
                  key={item.product_id}
                  id={item.product_id}
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                  img={item.image_url}
                  quantity={item.quantity}
                  categoryId={item.category_id}
                />
              ))}
            </div>
          </div>
        ) : <h2>Your cart is empty</h2>
        }

      <div className="order-summary-container">
        <div className="order-summary-title">
          <h4>Order Summary</h4>
        </div>
        <div className="order-summary-total">
          {`$${calculateTotalPrice(cartItems)}`}
        </div>
      </div>
    </div>
    </div>
  );
}