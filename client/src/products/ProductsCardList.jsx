import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoplyApi from "../api/api";
import ProductCard from "./ProductCard";
import "./ProductsCardList.css";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductsList() {
  const { category } = useParams();

  const [products, setProducts] = useState([])

  useEffect(function getCategoryProductsOnMount() {
    async function getCategoryProducts() {
      if (!category) return;
      let categoryData = await ShoplyApi.getCategory(category);
      let categoryId = categoryData.category.id;
      let products = await ShoplyApi.getProductsByCategoryId(categoryId);
      setProducts(products);
    }

    getCategoryProducts();
  }, [category])

  if (!category) {
    return <p className="lead text-center">Category not found.</p>
  }

  if (!products) return <LoadingSpinner />

  return (
    <div className="ProductsCardList">
      <h2 className="text-center">{category.toUpperCase()}</h2>
      <ul className="products-list">
        {products.map(product => (
          <ProductCard 
          key={product.id}
          id={product.id}
          category={category}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image_url}
          />
        ))}
      </ul>
    </div>
  );
}