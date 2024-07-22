import { Link } from 'react-router-dom';
import CategoriesBannerList from "../banner/CategoriesBannerList";
import "./CategoriesBanner.css";

export default function CategoriesBanner() {

  return (
    <section className="CategoriesBanner">
        <div className="category-title text-center">
          <h2 className="mb-4 font-weight-bold">Featured Categories</h2>
          <Link to={"/categories"}>See all</Link>
        </div>
        <CategoriesBannerList />

    </section>
  );
}