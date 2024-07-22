import { Link } from "react-router-dom";

export default function CategoryCard({ category, image }) {
  return (
    <div className="CategoryCard card d-flex flex-column">
      <Link className="category-link" to={`/categories/${category}`}>
        <div className="category-img-container">
          <img src={image} className="card-img" />
        </div>
        <div className="card-body">
          <div className="card-title text-center">{category}</div>
        </div>
      </Link>
    </div>
  );
}