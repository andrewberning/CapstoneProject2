import { Link } from "react-router-dom";
import Card from "react-bootstrap/card"
// import Button from "react-bootstrap/Button";

export default function CartCard({ name, desc, price, img }) {

  return (
    <Link className="CartCard card d-flex flex-row mx-1 align-items-center" to={"/"}>
      <div className="cart-item-img">
        <img src={img} />
      </div>
      <Card.Body>
        <div className="cart-item-details">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {price}
        </Card.Text>
        <Card.Text>
          {desc}
        </Card.Text>
        </div>
      </Card.Body>
    </Link>
  );
}