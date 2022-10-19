import { useDispatch, useSelector } from "react-redux";
import classes from "./MyAccount.module.css";
import profileImage from "../assets/profile-template.jpg";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { changePassword, setDisplayName } from "../helpers/fetchAccountInfos";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.name);
  const notification = useSelector((state) => state.ui.notification);

  const [nameIsClicked, setNameIsClicked] = useState(false);
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsClicked, setPasswordIsClicked] = useState(false);

  const [deleteAccountIsClicked, setDeleteAccountIsClicked] = useState(false);

  useEffect(() => {
    if (password.length >= 7) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  }, [password]);

  const onNameClickedHandler = () => {
    setNameIsClicked((prevValue) => !prevValue);
  };

  const onNameChangeHandler = (event) => {
    const name = event.target.value;

    setName(name);
  };

  const onNameSubmitHandler = () => {
    dispatch(setDisplayName(token, name));
  };

  const onPasswordClickedHandler = () => {
    setPasswordIsClicked((prevValue) => !prevValue);
  };

  const onPasswordChangeHandler = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const onPasswordSubmitHandler = () => {
    dispatch(changePassword(token, password));
  };

  const onAccountDeleteClickedHandler = () => {
    setDeleteAccountIsClicked((prevValue) => !prevValue);
  };

  const onDeleteAccountHandler = () => {};

  return (
    <div className={classes["my-account"]}>
      <h1>My Account</h1>
      <div className={classes["account-info"]}>
        <div className={classes["account-info__left"]}>
          <span>My Name: {userName || ""}</span>
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
          <div
            className={classes["name-edit-header"]}
            onClick={onNameClickedHandler}
          >
            <a>Change my name</a>
            <FaArrowDown />
          </div>
          <div>
            {nameIsClicked && (
              <div className={classes["name-edit-body"]}>
                <label htmlFor="new-name">New Name:</label>
                <input
                  type="text"
                  id="new-name"
                  onChange={onNameChangeHandler}
                />
                <button onClick={onNameSubmitHandler}>Submit</button>
              </div>
            )}
          </div>
        </div>
        <div className={classes["password-edit"]}>
          <div
            className={classes["password-edit-header"]}
            onClick={onPasswordClickedHandler}
          >
            <a>Change my password</a>
            <FaArrowDown />
          </div>
          {passwordIsClicked && (
            <div className={classes["password-edit-body"]}>
              <div className={classes["password-edit-input"]}>
                <label htmlFor="password">New Password:</label>
                <input
                  type="password"
                  id="new-password"
                  onChange={onPasswordChangeHandler}
                />
                <button
                  onClick={onPasswordSubmitHandler}
                  disabled={!passwordIsValid}
                >
                  Submit
                </button>
              </div>
              {notification && (
                <div className={notification.status === "Success" ? classes["success-notification"] : classes["fail-notification"]}>
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={classes["account-delete"]}>
          <div
            className={classes["account-delete-header"]}
            onClick={onAccountDeleteClickedHandler}
          >
            <a>Delete my account</a>
            <FaArrowDown />
          </div>
          {deleteAccountIsClicked && (
            <div className={classes["account-delete-body"]}>
              <label htmlFor="password">New Password:</label>
              <input type="password" id="new-password" />
              <button onClick={onDeleteAccountHandler}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
