import { useDispatch, useSelector } from "react-redux";
import classes from "./MyAccount.module.css";
import profileImage from "../assets/profile-template.jpg";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import {
  changePassword,
  deleteAccount,
  setDisplayName,
} from "../helpers/fetchAccountInfos";
import { uiActions } from "../store/ui-slice";
import { MutatingDots } from "react-loader-spinner";
import ConfigNotification from "../components/Layout/ConfigNotification";
import Modal from "../components/UI/Modal";
import { updateOrdersData } from "../store/previous-orders-actions";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.name);
  const notification = useSelector((state) => state.ui.notification);

  const photoIsClicked = useSelector((state) => state.ui.photoClicked);

  const [nameIsClicked, setNameIsClicked] = useState(false);
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsClicked, setPasswordIsClicked] = useState(false);

  const [deleteAccountIsClicked, setDeleteAccountIsClicked] = useState(false);

  const loadingSpinner = (
    <MutatingDots
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass={classes.spinner}
      visible={true}
    />
  );

  useEffect(() => {
    if (password.length >= 7) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  }, [password]);

  const onPhotoChangeHandler = () => {
    dispatch(uiActions.photoClicked());
  };

  const onNameClickedHandler = () => {
    setNameIsClicked((prevValue) => !prevValue);
    setPasswordIsClicked(false);
    setDeleteAccountIsClicked(false);
  };

  const onNameChangeHandler = (event) => {
    const name = event.target.value;

    setName(name);
  };

  const onNameSubmitHandler = () => {
    if (notification) {
      dispatch(uiActions.hideNotification());
    }
    dispatch(setDisplayName(token, name));
  };

  const onPasswordClickedHandler = () => {
    setPasswordIsClicked((prevValue) => !prevValue);
    setNameIsClicked(false);
    setDeleteAccountIsClicked(false);
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
    setNameIsClicked(false);
    setPasswordIsClicked(false);
  };

  const onDeleteAccountHandler = () => {
    // dispatch(updateOrdersData(user));
    dispatch(deleteAccount(token));
  };

  return (
    <div className={classes["my-account"]}>
      <h2 className="page-header">My Account</h2>
      <div className={classes["account-info"]}>
        <div className={classes["account-info__left"]}>
          <span>My Name: {userName || ""}</span>
          <span>My E-Mail: {user}</span>
        </div>
        <div className={classes["account-info__right"]}>
          <img alt="My Photo" src={profileImage} />
          <button onClick={onPhotoChangeHandler}>Edit</button>
        </div>
      </div>
      {photoIsClicked && (
        <Modal className={classes["new-photo"]}>
          <label htmlFor="new-photo">Add new photo</label>
          <input id="new-photo" type="text" />
          <button>Submit</button>
        </Modal>
      )}
      <h3 className="page-header">Change My Account Information</h3>
      <div className={classes["account-edit"]}>
        <div className={classes["name-edit"]}>
          <div
            className={classes["name-edit-header"]}
            onClick={onNameClickedHandler}
          >
            <a>Change my name</a>
            <FaArrowDown
              className={
                nameIsClicked ? classes["arrow-rotate"] : classes["arrow"]
              }
            />
          </div>
          <div>
            {nameIsClicked && (
              <div className={classes["name-edit-body"]}>
                <div className={classes["name-edit-input"]}>
                  <label htmlFor="new-name">New Name:</label>
                  <input
                    type="text"
                    id="new-name"
                    onChange={onNameChangeHandler}
                  />
                  <button onClick={onNameSubmitHandler}>Submit</button>
                </div>
                {notification &&
                  notification.status === "changing name" &&
                  loadingSpinner}
                {notification &&
                  (notification.status === "name changed" ||
                    notification.status === "name not changed") && (
                    <div
                      className={
                        notification.status === "name changed"
                          ? classes["success-notification"]
                          : classes["fail-notification"]
                      }
                    >
                      <h4>{notification.title}</h4>
                      <p>{notification.message || ""}</p>
                    </div>
                  )}
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
            <FaArrowDown
              className={
                passwordIsClicked ? classes["arrow-rotate"] : classes["arrow"]
              }
            />
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
              {notification &&
                notification.status === "changing password" &&
                loadingSpinner}
              {notification &&
                (notification.status === "password changed" ||
                  notification.status === "password not changed") && (
                  <div
                    className={
                      notification.status === "password changed"
                        ? classes["success-notification"]
                        : classes["fail-notification"]
                    }
                  >
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
            <FaArrowDown
              className={
                deleteAccountIsClicked
                  ? classes["arrow-rotate"]
                  : classes["arrow"]
              }
            />
          </div>
          {deleteAccountIsClicked && (
            <div className={classes["account-delete-body"]}>
              <div className={classes["account-delete-input"]}>
                <label htmlFor="password">New Password:</label>
                <input type="password" id="new-password" />
                <button
                  onClick={onDeleteAccountHandler}
                  className={classes["delete-button"]}
                >
                  Delete my account
                </button>
              </div>
              {notification &&
                notification.status === "deleting account" &&
                loadingSpinner}
              {notification && notification.status === "account deleted" && (
                <ConfigNotification
                  title={notification.title}
                  message={notification.message}
                />
              )}
              {notification && notification.status === "account not deleted" && (
                <div
                  className={
                    notification.status === "account deleted"
                      ? classes["success-notification"]
                      : classes["fail-notification"]
                  }
                >
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                </div>
              )}
              {notification &&
                notification.status === "deleting account" &&
                loadingSpinner}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
