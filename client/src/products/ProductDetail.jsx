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

    
  const handleAddToCart = () => {
    console.log("Add to cart button clicked!!!!");

    // Need to use function from props to add item to cart
    // let product = { id, name, price, image, category };
    // Ex: addToCart(product)
  }

  if (!product) return (
    <h2>Product not found.</h2>
  );

  return (
    
    <div className="ProductDetail card">
      <div className="product-img-container w-25">
        <img src={product.image_url} className="card-img" />
      </div>
      <div className="card-body">
        <div className="cart-item-details">
          <div className="card-title">{product.name}</div>
          <div className="card-text">{product.description}</div>
          <div className="card-price">${product.price}</div>
        </div>
      </div>
      <button onClick={handleAddToCart} className="btn btn-primary mt-2">
        Add to Cart
      </button>
    </div>
  )
}