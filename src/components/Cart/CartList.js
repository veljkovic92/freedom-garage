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
          <h3>{bike.name}</h3>
          <div>
            <span>Garaged on date: <br/> {bike.date}</span>
            
          </div>
        </div>
        <div className={classes["cart-mid"]}>
          <CartItem id={bike.id} config={bike.config} />
        </div>
        <div className={classes["cart-bot"]}>
          <div>
            <h4>Bike waiting time:</h4>
            <p>
              Estimated waiting time to complete this bike: {bike.waitingTime}
              working days.
            </p>
          </div>
          <div>
            <h4>Total bike price:</h4>
            <p>{bike.totalConfigPrice}</p>
          </div>
          
          <div>
            <button onClick={() => onRemoveConfigHandler(bike.id)} className={classes["remove-config-btn"]}>
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
