import { useContext } from "react";
import CategoryCard from "../categories/CategoryCard";
import UserContext from "../auth/UserContext";

export default function CategoriesCardList() {
  const { categories } = useContext(UserContext);
  
  return (
    <div className="CategoriesBannerList d-flex justify-content-center gap-4">
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          id={category.id}
          category={category.name}
          image={category.image_url}
        />
      )).slice(0,5)}
    </div>
  );
}