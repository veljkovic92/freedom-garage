import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = () => {
  const dispatch = useDispatch();

  const onCartClickHandler = () => {
    dispatch(uiActions.showCart())
  }

  return (
    <button className={classes.mainCartBtn} onClick={onCartClickHandler}>
      <span></span>
      <span>My Garage</span>
      <span></span>
    </button>
  );
};

export default CartButton;
