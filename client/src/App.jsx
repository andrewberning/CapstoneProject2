import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import Footer from "./footer/Footer";
import ShoplyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { getCurrentUserData, fetchCategories } from './utils/apiHelpers'

export const TOKEN_STORAGE_ID = "shoply-token"


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const navigate = useNavigate();

// Fetch categories on initial render
useEffect(() => {
  async function loadCategories() {
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("App loadCategories: problem loading categories", error);
    }
  }
  loadCategories();
}, []);

// Fetch user info if token exists
useEffect(() => {
  async function loadUserInfo() {
    if (token) {
      try {
        let { username } = jwt.decode(token);
        ShoplyApi.token = token;
        const currentUser = await getCurrentUserData(username);
        setCurrentUser(currentUser);
        setCartItems(currentUser.cartItems);
      } catch (error) {
        console.error("App loadUserInfo: problem loading user info", error);
        setCurrentUser(null);
      }
    }
    setInfoLoaded(true);
  }

  setInfoLoaded(false);
  loadUserInfo();
}, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
    setCartItems([]);
    navigate('/');
  }
  
  // Handle site-wide signup.
  async function signup(signupData) {
    try{
      const token = await ShoplyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch(errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  
  // Handle site-wide login
  async function login(loginData) {
    try{
      const token = await ShoplyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch(errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // Check if an Item was added to cart
  function hasAddedToCart(item) {
    return cartItems.some(cartItem => cartItem.product_id === item.product_id);
  }

  /** Add item to a cart: make API call and update set of items in cart. */
  function addToCart(user, item, quantity) {
    if (hasAddedToCart(item)) return;
    ShoplyApi.addToCart(user, item, quantity);
    setCartItems([...cartItems, item]);
  }

  // if no info loaded, render LoadingSpinner
  if (!infoLoaded) return <h1>Info Loading</h1>;
  
  return (
    <UserContext.Provider
        value={{ currentUser, setCurrentUser, addToCart, hasAddedToCart, cartItems, setCartItems, categories}}>
      <div className="App">
        <Navigation logout={logout}/>
        <RoutesList login={login} signup={signup} />
        <Footer />
      </div>
    </UserContext.Provider>
  )
}

export default App
