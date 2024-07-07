import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import Footer from "./footer/Footer";
import ShoplyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export const TOKEN_STORAGE_ID = "shoply-token"


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if(token) {
        try {
          let { username } = jwt.decode(token);
          ShoplyApi.token = token;
          let currentUser = await ShoplyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (error) {
          console.error("App loadUserInfo: problem loading", error);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }
  
  // Handle site-wide signup.
  async function signup(signupData) {
    try{
      let token = await ShoplyApi.signup(signupData);
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
      let token = await ShoplyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch(errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

    // if no info loaded, render LoadingSpinner
    if (!infoLoaded) return <h1>Info Loading</h1>;
  
  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser, setCurrentUser}}>
        <div className="App">
          <Navigation logout={logout}/>
          <RoutesList login={login} signup={signup} />
          <Footer />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
