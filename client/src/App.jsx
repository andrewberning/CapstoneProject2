import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import Footer from "./footer/Footer";
import UserContext from "./auth/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser, setCurrentUser}}>
        <div className="App">
          <Navigation />
          <RoutesList />
          <Footer />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
