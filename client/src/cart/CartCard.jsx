import { Link } from "react-router-dom";
import Card from "react-bootstrap/card"
// import Button from "react-bootstrap/Button";

export default function CartCard({ id, name, desc, price, img, quantity, categoryId }) {

      // NEED TO FIND A WAY TO GET THE CATEGORY FOR LINK TO GO TO PRODUCT CARD

  return (
    <Link className="CartCard card d-flex flex-row mx-1 align-items-center" to={`/${categoryId}/${id}`}>
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
        <Card.Text>
          Qty: {quantity}
        </Card.Text>
        </div>
      </Card.Body>
    </Link>
  );
}