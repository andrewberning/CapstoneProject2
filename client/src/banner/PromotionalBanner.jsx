// import { useContext } from "react";
// import UserContext from "../auth/UserContext";
import "./PromotionalBanner.css"

export default function PromotionalBanner() {

  return (
    <section className="PromotionalBanner d-flex flex-column justify-content-center align-items-center">
        <div className="promotional-title">
          <h2 className="mb-4 font-weight-bold">
            Check out our Summer Deals!
          </h2>
        </div>
        <div className="promotion">
          <h3>50% off select summer items!</h3>
        </div>
    </section>
  );
}