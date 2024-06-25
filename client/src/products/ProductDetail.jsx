import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShoplyApi from "../api/api";


export default function ProductDetail() {
  const { id, category } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(function getProductForUser() {
    async function getProduct() {
      setProduct(await ShoplyApi.getProduct(id, category));
    }

    getProduct();
  }, [id, category]);

  if (!product) return (
    <h2>Product not found.</h2>
  );

  return (
    
    <div className="ProductDetail">
      <div className="card-body">
      <div className="product-img-container w-25">
        <img src={product.image} className="card-img" />
      </div>
        <div className="cart-item-details">
          <div className="card-title">{product.name}</div>
          <div className="card-text">{product.description}</div>
          <div className="card-price">{product.price}</div>
        </div>
      </div>
    </div>
  )
}