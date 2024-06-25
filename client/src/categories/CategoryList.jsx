import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoplyApi from "../api/api";
import ProductsCard from "../products/ProductsCard";

export default function CategoryList() {
  const { category } = useParams();

  const [products, setProducts] = useState([])

  useEffect(function getCategoryProductsOnMount() {
    async function getCategoryProducts() {
      setProducts(await ShoplyApi.getProductsByCategory(category));
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
            <ProductsCard 
            key={product.id}
            id={product.id}
            category={category}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
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