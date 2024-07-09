import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoplyApi from "../api/api";
import ProductCard from "../products/ProductCard";

export default function CategoryList() {
  const { category } = useParams();

  const [products, setProducts] = useState([])

  useEffect(function getCategoryProductsOnMount() {
    async function getCategoryProducts() {
      let categoryData = await ShoplyApi.getCategory(category);
      let categoryId = categoryData.category.id;
      let products = await ShoplyApi.getProductsByCategoryId(categoryId);
      setProducts(products);
    }

    getCategoryProducts();
  }, [category])



  return (
    <div>
      <h2 className="text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {products.length
        ? (
          <div className="d-flex justify-content-center">
          <div className="productsList d-flex flex-wrap">
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
          </div>
        </div>
        ) : (
          <p className="lead text-center">Sorry, no results were found.</p>
        )
      }

    </div>
  );
}