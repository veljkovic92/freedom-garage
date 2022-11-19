import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./ConfigNotification.module.css";

import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";

const ConfigNotification = (props) => {
  const notification = useSelector((state) => state.ui.notification);
  const history = useHistory();

  const dispatch = useDispatch();
  const btnCLickHandler = () => {
    if (notification.status === "account deleted") {
      dispatch(authActions.userLoggedOut());
      history.replace("/");
    }
    if (notification.status === "bike added to cart") {
      history.replace("/bikes");
    }
    dispatch(uiActions.hideNotification());
  };

  return (
    <Modal className={classes.notification}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <button onClick={btnCLickHandler}>Close</button>
    </Modal>
  );
};

export default ConfigNotification;
