import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CategoriesList from "../categories/CategoriesList";
import ProductsCardList from "../products/ProductsCardList";
import UserInfo from "../user/UserInfo";
import CartList from "../cart/CartList";
import ProductDetail from "../products/ProductDetail";
import Checkout from "../checkout/Checkout";
import ConfirmationPage from "../confirmation/ConfirmationPage";
import PrivateRoute from './PrivateRoute';


export default function RoutesList() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/categories/:category" element={<ProductsCardList />} />
        <Route path="/:category/:id" element={<ProductDetail />} />
        <Route path="/account" element={<PrivateRoute><UserInfo /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><CartList /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/order-confirmation" element={<PrivateRoute><ConfirmationPage /></PrivateRoute>} />
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>
  )
}