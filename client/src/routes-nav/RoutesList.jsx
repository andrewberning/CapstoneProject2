import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CategoriesList from "../categories/CategoriesList";
import CategoryList from "../categories/CategoryList";
import CartList from "../cart/CartList";
import ProductDetail from "../products/ProductDetail";


export default function RoutesList() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/categories/:category" element={<CategoryList />} />
        <Route path="/:category/:id" element={<ProductDetail />} />
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>
  )
}