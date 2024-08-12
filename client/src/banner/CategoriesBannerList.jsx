import { useContext } from "react";
import CategoryCard from "../categories/CategoryCard";
import UserContext from "../auth/UserContext";
import "./CategoriesBannerList.css";

export default function CategoriesCardList() {
  const { categories } = useContext(UserContext);
  
  return (
    <div className="CategoriesBannerList">
      <ul className="categories-list">
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          id={category.id}
          category={category.name}
          image={category.image_url}
        />
      )).slice(0,4)}
      </ul>
    </div>
  );
}