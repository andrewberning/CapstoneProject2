import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoplyApi from "../api/api";
import ProductCard from "./ProductCard";
import "./ProductsCardList.css";

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

  return (
    <div className="ProductsCardList">
      <h2 className="text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {products.length
        ? (
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
        ) : (
          <p className="lead text-center">Sorry, no results were found.</p>
        )
      }

    </div>
  );
}