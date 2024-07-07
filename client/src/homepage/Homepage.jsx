import WelcomeBanner from "../banner/WelcomeBanner";
import CategoriesBanner from "../banner/CategoriesBanner";
import PromotionalBanner from "../banner/PromotionalBanner";
import "./Homepage.css";

export default function Homepage() {
  
  return (
    <div className="Homepage">
      <WelcomeBanner />
      <PromotionalBanner />
      <CategoriesBanner />
    </div>
  );
}