import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./BikeItem.module.css";

const BikeItem = (props) => {
  const history = useHistory();
  const price = props.price;
  const cartItems = useSelector((state) => state.cart.items);
  const bikeAlreadyInCart = cartItems.find((item) => item.id === props.id);

  const onConfigureHandler = () => {
    if (!bikeAlreadyInCart) {
      history.push(`/bikes/${props.name.toLowerCase()}`);
    }
  };

  const bikeItemAction = !bikeAlreadyInCart ? (
    <button onClick={onConfigureHandler}>Configure</button>
  ) : (
    <p>This bike is already added in "Your Garage"</p>
  );

  return (
    <Card className={classes["bike-item"]} onClick={onConfigureHandler}>
      <div className={classes["left-box"]}>
        <div className={classes["bike-item-img"]} style={{backgroundImage: `url("${props.img}")`}}></div>
      </div>
      <div className={classes["right-box"]}>
        <div className={classes["right-top-box"]}>
          <h2>{props.name}</h2>
          <span className={classes.price}>{price} eur</span>
        </div>
        <div>
          <p>{props.desc}</p>
        </div>
        {bikeItemAction}
      </div>
    </Card>
  );
};

export default BikeItem;
