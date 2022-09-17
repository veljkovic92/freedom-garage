import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./ConfigNotification.module.css";

const ConfigNotification = (props) => {
  const dispatch = useDispatch();
  const btnCLickHandler = () => {
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
