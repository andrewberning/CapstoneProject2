import { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./WelcomeBanner.css";

export default function WelcomeBanner() {
  const { currentUser } = useContext(UserContext);

  return (
    <section className="WelcomeBanner">
      <div className="banner-container">
        {currentUser
          ? <h1 className="title">WELCOME TO SHOPLY, {currentUser.firstName.toUpperCase()}!</h1>
          : <h1 className="title">WELCOME TO SHOPLY</h1>
        }
        <p className="lead">Everything in one, convenient place.</p>
      </div>
    </section>
  );
}