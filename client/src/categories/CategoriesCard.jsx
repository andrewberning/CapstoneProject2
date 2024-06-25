import { Link } from "react-router-dom";


export default function CategoriesCard({ category }) {
  return (
    <Link className="CategoryCard card d-flex flex-row mx-1 align-items-center" to={`/categories/${category}`}>
      <div className="card-body">
        <div className="cart-item-details">
          <div className="card-title">{category}</div>
        </div>
      </div>
    </Link>
  );
}