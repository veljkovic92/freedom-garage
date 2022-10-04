import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import CartItem from "./CartItem";
import classes from "./CartList.module.css";

const CartList = () => {
  const dispatch = useDispatch();
  const chosenBikes = useSelector((state) => state.cart.items);
  const history = useHistory();

  const onRemoveConfigHandler = (bikeId) => {
    dispatch(cartActions.removeFromCart(bikeId));

    if (chosenBikes.length === 1) {
      dispatch(uiActions.hideCart());
      history.push("/bikes");
    }
  };

  return chosenBikes.map((bike) => {
    return (
      <ul className={classes["cart-list"]} key={bike.id}>
        <div className={classes["cart-top"]}>
          <h2>{bike.name}</h2>
        </div>
        <div className={classes["cart-mid"]}>
          <CartItem id={bike.id} config={bike.config} />
        </div>
        <div className={classes["cart-bot"]}>
          <div>
            <h3>Please note:</h3>
            <p>
              Estimated waiting time to complete this bike: {bike.waitingTime}{" "}
              working days.
            </p>
          </div>
          <div>
            <h3>Total price for this bike: {bike.totalConfigPrice}</h3>
          </div>
          <div>
            <h4>Date of adding: {bike.date}</h4>
          </div>
          <div>
            <button onClick={() => onRemoveConfigHandler(bike.id)}>
              Remove <br />
              Configuration
            </button>
          </div>
        </div>
      </ul>
    );
  });
};

export default CartList;
