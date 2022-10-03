import Modal from "../UI/Modal";
import CartList from "./CartList";
import classes from "./Cart.module.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const waitingTime = useSelector((state) => state.cart.waitingTime);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Modal>
      <CartList />
      <div className={classes["cart-actions"]}>
        <span>Total Price: {totalPrice}eur</span>
        <span>Total Waiting Time: {waitingTime}</span>
        <span>Total Bikes in Cart: {totalQuantity}</span>
        <button>Submit My Config</button>
        <button>Exit My Garage</button>
      </div>
    </Modal>
  );
};

export default Cart;
