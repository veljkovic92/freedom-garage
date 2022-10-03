import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  // add the date and time of adding to cart

  const config = props.config;
  const boja = "red-color";
  const dispatch = useDispatch();

  const availableBikes = useSelector((state) => state.bikes.bikes);
  const cartItems = useSelector((state) => state.cart.items);


  const cartItem = cartItems.find((item) => item.id === props.id);

  console.log(cartItem.totalConfigPrice);

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
          <h2>{config[item].name}</h2>
        </div>
        <div>
          <h3>Status</h3>
          {config[item].price !== 0 ? (
            <span className={classes.value}>"Added"</span>
          ) : (
            <span className={`${classes.value} ${classes[boja]}`}>
              "Not Added"
            </span>
          )}
        </div>
        <div>
          <h3>Value</h3>
          <span className={classes.value}>{config[item].value}</span>
        </div>
        <div>
          <h3>Waiting Time</h3>
          <span className={classes.value}>{config[item].waitingTime}</span>
        </div>
        <div>
          <h3>Price</h3>
          <span className={classes.value}>{config[item].price}</span>
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
