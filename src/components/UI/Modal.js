import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import classes from "./Modal.module.css";
import Card from "./Card";
import { uiActions } from "../../store/ui-slice";

const Backdrop = () => {
  const dispatch = useDispatch();
  const onBackdropClickHandler = () => {
    dispatch(uiActions.hideNotification());
    dispatch(uiActions.hideCart());
  };
  return (
    <div className={classes.backdrop} onClick={onBackdropClickHandler}></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <Card className={`${classes.overlay} ${props.className}`}>
      {props.children}
    </Card>
  );
};

const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </div>
  );
};

export default Modal;
