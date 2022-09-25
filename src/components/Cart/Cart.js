import Modal from "../UI/Modal";
import CartList from "./CartList";
import classes from "./Cart.module.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
 
  return (
    <Modal>
      <CartList />
      <div className={classes["cart-actions"]}>
        <span>Total Price: {totalPrice}eur</span>
        <button>Submit My Config</button>
        <button>Exit My Garage</button>
      </div>
    </Modal>
  );
};

export default Cart;
