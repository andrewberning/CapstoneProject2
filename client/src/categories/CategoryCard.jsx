import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category, image }) {
  return (
    <li className="CategoryCard">
      <Link className="category-link card flex-column" to={`/categories/${category}`}>
        <div className="category-img-container">
          <img src={image} className="card-img" />
        </div>
        <div className="card-body">
          <div className="card-title text-center">{category}</div>
        </div>
      </Link>
    </li>
  );
}