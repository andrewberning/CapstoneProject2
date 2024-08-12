import { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./WelcomeBanner.css";

export default function WelcomeBanner() {
  const { currentUser } = useContext(UserContext);

  return (
    <section className="WelcomeBanner d-flex justify-content-center align-items-center">
      <div className="text-center ">
        {currentUser
          ? <h2>Welcome to Shoply {currentUser.firstName}!</h2>
          : <h2>Welcome to Shoply</h2>
        }
        <p className="lead">Everything in one, convenient place.</p>
      </div>
    </section>
  );
}