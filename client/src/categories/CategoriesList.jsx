import { useState, useEffect } from "react";
import ShoplyApi from "../api/api";
import CategoriesCardList from "./CategoriesCardList";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  
  useEffect(function getAllCategoriesOnMount() {
    async function getAllCategories(category) {
      let categories = await ShoplyApi.getCategories(category);
      setCategories(categories);
    }

    getAllCategories();
  }, [])

  return (
    <div className="ClothingList">
      <h2>Categories</h2>
      <CategoriesCardList categories={categories} />
    </div>
  )
}