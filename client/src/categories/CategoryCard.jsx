import { Link } from "react-router-dom";


export default function CategoryCard({ category, image }) {
  return (
    <div className="CategoryCard card d-flex flex-column">
      <Link className="category-link" to={`/categories/${category}`}>
      <div className="product-img-container">
        <img src={image} className="card-img" />
      </div>
      <div className="card-body">
        <div className="cart-item-details">
          <div className="card-title">{category}</div>
        </div>
      </div>
      </Link>
    </div>
  );
}