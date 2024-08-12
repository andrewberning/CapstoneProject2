import CategoriesCardList from "./CategoriesCardList";
import "./CategoriesList.css";

export default function CategoriesList() {

  return (
    <div className="CategoriesList">
      <h2 className="title">Categories</h2>
      <CategoriesCardList />
    </div>
  )
}