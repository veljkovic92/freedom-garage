import Modal from "../UI/Modal";
import CartList from "./CartList";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import { setOrdersData } from "../../store/cart-actions";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchOrdersData } from "../../store/previous-orders-actions";
import ConfigNotification from "../Layout/ConfigNotification";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalWaitingTime = useSelector((state) => state.cart.waitingTime);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.user);
  const notification = useSelector((state) => state.ui.notification);
  const oneOrMoreWaitingDays = totalWaitingTime <= 1 ? "day" : "days";
  const oneOrMoreQuantity = totalQuantity <= 1 ? "bike" : "bikes";

  const onCartSubmitHandler = () => {
    var cartId = "id" + Math.random().toString(16).slice(2);

    const submittedCart = {
      user,
      cartId,
      cartItems,
      totalPrice,
      totalWaitingTime,
      totalQuantity,
    };
    dispatch(setOrdersData(submittedCart));

    dispatch(
      uiActions.showNotification({
        status: "order set",
        title: "Garage order set",
        message:
          "The confirmation email has been sent to you. Please check your inbox!",
      })
    );

    dispatch(cartActions.clearCart());
    dispatch(uiActions.hideCart());
    history.replace("/bikes");
  };

  const onExitGarageHandler = () => {
    dispatch(uiActions.hideCart());
  };

  return (
    <Modal className={classes.cart}>
      <h2 className="page-header">
        View and/or edit your currently garaged bikes here
      </h2>
      <CartList />
      <div className={classes["cart-actions"]}>
        <div className={classes["top-cart-actions"]}>
          <div>
            <span>Total Price: </span>
            <span>{totalPrice} eur</span>
          </div>
          <div>
            <span>Total Waiting Time: </span>
            <span>
              {totalWaitingTime} {oneOrMoreWaitingDays}
            </span>
          </div>
          <div>
            <span>Total Bikes: </span>
            <span>
              {totalQuantity} {oneOrMoreQuantity}
            </span>
          </div>
        </div>
        <div className={classes["bot-cart-actions"]}>
          <button
            onClick={onCartSubmitHandler}
            className={classes["submit-cart-btn"]}
          >
            Submit My Config
          </button>
          <button
            className={classes["exit-cart-btn"]}
            onClick={onExitGarageHandler}
          >
            Exit My Garage
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
