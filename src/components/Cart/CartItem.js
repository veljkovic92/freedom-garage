import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  // add the date and time of adding to cart

  const config = props.config;
  const dispatch = useDispatch();

  const availableBikes = useSelector((state) => state.bikes.bikes);
  const cartItems = useSelector((state) => state.cart.items);

  const cartItem = cartItems.find((item) => item.id === props.id);

  const addItemHandler = (event) => {
    const buttonName = event.target.name;

    const chosenUpgradePrice =
      availableBikes[cartItem.name.toLowerCase()].upgrades[buttonName].price;
    const chosenUpgradeWaitingTime =
      availableBikes[cartItem.name.toLowerCase()].upgrades[buttonName]
        .waitingTime;

    const updatedConfig = {
      id: props.id,
      name: buttonName,
      chosenUpgradePrice,
      chosenUpgradeWaitingTime,
    };

    dispatch(cartActions.addItemToCart(updatedConfig));
  };

  const removeItemHandler = (event) => {
    const buttonName = event.target.name;

    const chosenUpgradePrice =
      availableBikes[cartItem.name.toLowerCase()].upgrades[buttonName].price;
    const chosenUpgradeWaitingTime =
      availableBikes[cartItem.name.toLowerCase()].upgrades[buttonName]
        .waitingTime;

    const updatedConfig = {
      id: props.id,
      name: buttonName,
      chosenUpgradePrice,
      chosenUpgradeWaitingTime,
    };

    dispatch(cartActions.removeItemFromCart(updatedConfig));
  };

  const configMap = Object.keys(config).map((item, index) => {
    return (
      <li key={item} className={classes["cart-item"]}>
        <div>
          <h4 className={classes["cart-item-header"]}>{config[item].name}</h4>
        </div>
        <div>
          <h4>Status</h4>
          {config[item].price !== 0 ? (
            <span className={`${classes.value} ${classes["value-added"]}`}>
              "Added"
            </span>
          ) : (
            <span className={`${classes.value} ${classes["value-not-added"]}`}>
              "Not Added"
            </span>
          )}
        </div>
        <div>
          <h4>Value</h4>
          <span className={classes.value}>{config[item].value}</span>
        </div>
        <div>
          <h4>Waiting Time</h4>
          <span className={classes.value}>
            {config[item].waitingTime === 0 ? "none" : config[item].waitingTime} {config[item].waitingTime >= 2 ? "days" : config[item].waitingTime === 1 ? "day" : ""}
          </span>
        </div>
        <div>
          <h4>Price</h4>
          <span className={classes.value}>{config[item].price} eur</span>
        </div>
        <div>
          {config[item].price === 0 ? (
            <button onClick={addItemHandler} name={item}>
              Add
            </button>
          ) : (
            <button onClick={removeItemHandler} name={item}>
              Remove
            </button>
          )}
        </div>
      </li>
    );
  });

  return configMap;
};

export default CartItem;
