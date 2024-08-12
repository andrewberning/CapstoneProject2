import { useContext } from "react";
import CategoryCard from "./CategoryCard";
import UserContext from "../auth/UserContext";
import "./CategoriesCardList.css";

export default function CategoriesCardList() {
  const { categories } = useContext(UserContext);

  return (
    <div className="CategoriesCardList">
      <ul className="categories-list">
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          id={category.id}
          category={category.name}
          image={category.image_url}
        />
      ))}
      </ul>
    </div>
  );
}