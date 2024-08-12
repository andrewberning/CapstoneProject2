import React from "react";
import UserContext from "./auth/UserContext";
import { vi } from 'vitest';

const demoUser = {
  username: "testuser",
  first_name: "Test",
  last_name: "User",
  email: "testuser123@test.net",
};

// Mock functions
const mockSetCurrentUser = vi.fn();
const mockLogin = vi.fn();
const mockLogout = vi.fn();
const mockSignup = vi.fn();
const mockAddToCart = vi.fn();
const mockHasAddedToCart = vi.fn();

const UserProvider = ({ 
  children,
  currentUser = demoUser,
  setCurrentUser = mockSetCurrentUser,
  login = mockLogin,
  logout = mockLogout,
  signup = mockSignup,
  addToCart = mockAddToCart,
  hasAddedToCart = mockHasAddedToCart,
  cartItems = [],
  setCartItems = () => {},
  categories = [],
  infoLoaded = true,
  totalAmount = 0,
  totalItems = 0,
}) => (
  <UserContext.Provider value={{ 
    currentUser,
    setCurrentUser,
    login,
    logout,
    signup,
    addToCart,
    hasAddedToCart,
    cartItems,
    setCartItems,
    categories,
    infoLoaded,
    totalAmount,
    totalItems,
  }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider, mockSetCurrentUser, mockLogin, mockLogout, mockSignup, mockAddToCart, mockHasAddedToCart };
