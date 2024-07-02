import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoriesCardList from "../categories/CategoriesCardList";
import ShoplyApi from '../api/api';
import "./CategoriesBanner.css";

export default function CategoriesBanner() {
  const [categories, setCategories] = useState([]);

  useEffect(function getFiveCategoriesOnMount() {
    async function getCategories(category) {
      let categories = await ShoplyApi.getCategories(category);
      setCategories(categories);
    }

    getCategories();
  }, [])

  return (
    <section className="CategoriesBanner">
        <div className="category-title text-center">
          <h2 className="mb-4 font-weight-bold">Featured Categories</h2>
          <Link to={"/categories"}>See all</Link>
        </div>
        <CategoriesCardList categories={categories.slice(0,5)} />

    </section>
  );
}