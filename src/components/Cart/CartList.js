import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import classes from "./CartList.module.css";

const CartList = () => {
  const chosenBikes = useSelector((state) => state.cart.items);
  

  return Object.keys(chosenBikes).map((bike) => {
    return (
      <ul className={classes["cart-list"]} key={chosenBikes[bike].id}>
        <div className={classes["cart-top"]}>
          <h2>{chosenBikes[bike].name}</h2>
        </div>
        <div className={classes["cart-bot"]}>
          <CartItem id={chosenBikes[bike].id} config={chosenBikes[bike].config} />
        </div>
        <div>
        <h3>Please note:</h3>
          <p>Estimated total waiting time: {chosenBikes[bike].waitingTime} working days.</p>
        </div>
      </ul>
    );
  });
};

export default CartList;
