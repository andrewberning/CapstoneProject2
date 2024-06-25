import CartCard from './CartCard';
const stockImg = "https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg"

export default function CartList() {
  const cartItems = [
    {name: "Rocking Horse", desc: "A fun Rocking Horse to play with.", price: "$9.99", img: stockImg},
    {name: "PS5", desc: "Gaming console.", price: "$399.99", img: stockImg},
    {name: "Adidas T-Shirt", desc: "An awesome t-shirt to wear.", price: "$13.99", img: stockImg},
  ];
  // const cartItems = null;

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
      {cartItems
        ? (
            <div className="cart-list-container w-50">
              <div className="cartItemsList d-flex flex-column">
                {cartItems.map(item => (
                  <CartCard 
                    key={item.name}
                    name={item.name}
                    desc={item.desc}
                    price={item.price}
                    img={item.img}
                  />
                ))}
              </div>
            </div>
          )
        : <h2>Your cart is empty</h2>
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