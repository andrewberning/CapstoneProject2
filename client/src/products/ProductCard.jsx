import { Link } from "react-router-dom";
import "./ProductCard.css"


export default function ProductCard({ id, name, price, image, category }) {
  const handleAddToCart = () => {
    console.log("Add to cart button clicked!!!!");

    // Need to use function from props to add item to cart
    // let product = { id, name, price, image, category };
    // Ex: addToCart(product)
  }
  
  return (
    <div className="ProductsCard card d-flex flex-column">
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
      <button onClick={handleAddToCart} className="btn btn-primary mt-2">
        Add to Cart
      </button>
    </div>
  );
}