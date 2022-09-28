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

  // napravi da direktno povlacis data iz availableBikes i cartItems i da onda direktno menjas cartItems u zavisnosti od value u availableBIkes
  const addItemHandler = (event) => {
    const buttonName = event.target.name;

    const cartItem = cartItems.find((item) => item.id === props.id);
    const chosenBikePrice =
      availableBikes[cartItem.name.toLowerCase()].upgrades[buttonName].price;
    const chosenBikeWaitingTime =
      availableBikes[cartItem.name.toLowerCase()].upgrades[buttonName]
        .waitingTime;

    let chosenUpgradePrice = cartItem.config[buttonName].price;
    let chosenUpgradeWaitingTime = cartItem.config[buttonName].waitingTime;
    chosenUpgradePrice = chosenBikePrice;
    chosenUpgradeWaitingTime = chosenBikeWaitingTime;
    const updatedConfig = {
      id: props.id,
      name: buttonName,
      chosenUpgradePrice,
      chosenUpgradeWaitingTime,
    };

    

    dispatch(cartActions.addItemToCart(updatedConfig));
  };

  const removeItemHandler = () => {};

  const configMap = Object.keys(config).map((item, index) => {
    return (
      <li key={item} className={classes["cart-item"]}>
        <div>
          <h2>{config[item].name}</h2>
        </div>
        <div>
          <h3>Status</h3>
          {config[item].value !== "none" ? (
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
          <button onClick={addItemHandler} name={item}>
            Add
          </button>
          <button onClick={removeItemHandler} name={item}>
            Remove
          </button>
        </div>
      </li>
    );
  });

  return configMap;
};

export default CartItem;
