import { useSelector } from "react-redux";
import classes from "./MyAccount.module.css";
import profileImage from "../assets/profile-template.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowDown } from "react-icons/fa";

const MyAccount = () => {
  const user = useSelector((state) => state.auth.user);

  const onNameChangeHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
      {}
    );
  };

  const onPasswordChangeHandler = () => {};

  return (
    <div className={classes["my-account"]}>
      <h1>My Account</h1>
      <div className={classes["account-info"]}>
        <div className={classes["account-info__left"]}>
          <span>My Name:</span>
          <span>My E-Mail: {user}</span>
        </div>
        <div className={classes["account-info__right"]}>
          <img alt="My Photo" src={profileImage} />
          <a>Edit</a>
        </div>
      </div>
      <h3>Change My Account Information</h3>
      <div className={classes["account-edit"]}>
        <div className={classes["name-edit"]}>
          <a onClick={onNameChangeHandler}>Change my name</a>
          <FaArrowDown />
        </div>
        <div className={classes["password-edit"]}>
          <a onClick={onPasswordChangeHandler}>Change my password</a>
          <FaArrowDown />
        </div>
        <div>
          <a>Delete my account</a>
          <FaArrowDown />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
