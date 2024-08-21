import { useContext } from "react";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./components/LoadingSpinner";
import Footer from "./footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { infoLoaded } = useContext(UserContext);

  // if no info loaded, render loading message
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <Navigation />
      <div className="content">
        <RoutesList />
      </div>
      <Footer />
    </div>
  );
}


export default App;
