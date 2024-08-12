import WelcomeBanner from "../banner/WelcomeBanner";
import CategoriesBanner from "../banner/CategoriesBanner";
import "./Homepage.css";

export default function Homepage() {
  
  return (
    <div className="Homepage">
      <WelcomeBanner />
      <CategoriesBanner />
    </div>
  );
}