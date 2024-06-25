import { Link } from "react-router-dom";


export default function ProductsCard({ id, name, description, price, image, category }) {
  return (
    <Link className="ProductsCard card d-flex flex-column" to={`/${category}/${id}`}>
      <div className="product-img-container">
        <img src={image} className="card-img" />
      </div>
      <div className="card-body">
        <div className="cart-item-details">
          <div className="card-title">{name}</div>
          <div className="card-text">{description}</div>
          <div className="card-price">{price}</div>
        </div>
      </div>
    </Link>
  );
}