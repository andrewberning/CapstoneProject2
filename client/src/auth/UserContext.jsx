import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import ShoplyApi from "../api/api";
import jwt from "jsonwebtoken";
import { getCurrentUserData, fetchCategories } from "../utils/apiHelpers";

const UserContext = createContext();

export const TOKEN_STORAGE_ID = "shoply-token";

export const UserProvider = ({ children }) => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const navigate = useNavigate();

  // Fetch categories on initial render
  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("UserProvider loadCategories: problem loading categories", error);
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
          setCartItems(currentUser.cartItems || []);
        } catch (error) {
          console.error("UserProvider loadUserInfo: problem loading user info", error);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    loadUserInfo();
  }, [token]);

  // Function to calculate total price
  const calculateTotalPrice = useCallback(() => {
    const newTotalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(newTotalAmount);
  }, [cartItems]);

  // Function to calculate total items
  const calculateTotalItems = useCallback(() => {
    const newTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(newTotalItems);
  }, [cartItems]);

  // Function to remove an item from cart
  const removeFromCart = async (itemId) => {
    try {
      await ShoplyApi.removeFromCart(itemId);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (err) {
      console.error("Error removing item from cart", err);
    }
  }

  useEffect(() => {
    calculateTotalPrice();
    calculateTotalItems();
  }, [cartItems, calculateTotalPrice, calculateTotalItems]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
    setCartItems([]);
    navigate('/');
  }

  // Handle site-wide signup.
  async function signup(signupData) {
    try {
      const token = await ShoplyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  // Handle site-wide login
  async function login(loginData) {
    try {
      const token = await ShoplyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // Check if an Item was added to cart
  function hasAddedToCart(productId) {
    return cartItems.some(cartItem => cartItem.product_id === productId);
  }

  /** Add item to a cart: make API call and update set of items in cart. */
  async function addToCart(user, item, quantity) {
    if (hasAddedToCart(item.product_id)) return;
    const newItem = await ShoplyApi.addToCart(user, item, quantity);
    setCartItems([...cartItems, newItem]);
  }

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, addToCart, hasAddedToCart, cartItems, setCartItems, removeFromCart, categories, logout, signup, login, infoLoaded, totalAmount, totalItems, setTotalItems }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
