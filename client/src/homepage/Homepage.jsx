import WelcomeBanner from "../banner/WelcomeBanner";
import CategoriesBanner from "../banner/CategoriesBanner";
import PromotionalBanner from "../banner/PromotionalBanner";
import "./Homepage.css";

export default function Homepage() {
  // const { currentUser } = useContext(UserContext);
  // console.debug("Homepage", "currentUser=", currentUser);
  
  return (
    <div className="Homepage">
      <WelcomeBanner />
      <PromotionalBanner />
      <CategoriesBanner />
    </div>
  );
}