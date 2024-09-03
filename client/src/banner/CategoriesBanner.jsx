import { Link } from 'react-router-dom';
import CategoriesBannerList from "../banner/CategoriesBannerList";
import "./CategoriesBanner.css";

export default function CategoriesBanner() {

  return (
    <section className="CategoriesBanner">
        <div className="categories-title-container">
          <h2 className="categories-title">FEATURED CATEGORIES</h2>
        </div>
        <div className="all-categories-link-container">
          <button className='btn mt-3'>
          <Link to={"/categories"} className="all-categories-link">See all categories</Link>
          </button>
        </div>
        <CategoriesBannerList />
    </section>
  );
}