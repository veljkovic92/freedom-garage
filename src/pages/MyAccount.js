import { useDispatch, useSelector } from "react-redux";
import classes from "./MyAccount.module.css";
import profileImage from "../assets/profile-template.png";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import {
  changePassword,
  deleteAccount,
  editPhoto,
  setDisplayName,
} from "../helpers/fetchAccountInfos";
import { uiActions } from "../store/ui-slice";
import { ThreeDots } from "react-loader-spinner";
import ConfigNotification from "../components/Layout/ConfigNotification";
import Modal from "../components/UI/Modal";
import { updateOrdersData } from "../store/previous-orders-actions";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.name);
  const userPhoto = useSelector((state) => state.auth.photoUrl);
  const notification = useSelector((state) => state.ui.notification);

  const [photo, setPhoto] = useState("");
  const photoIsClicked = useSelector((state) => state.ui.photoClicked);
  const [photoIsValid, setPhotoIsValid] = useState(false);

  const [name, setName] = useState("");
  const [nameIsClicked, setNameIsClicked] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIsClicked, setPasswordIsClicked] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [deleteAccountIsClicked, setDeleteAccountIsClicked] = useState(false);

  const loadingSpinner = (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="rgb(265,65,65)"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );

  useEffect(() => {
    if (name.length >= 3 && /^[A-Za-z0-9]*$/.test(name)) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }

    if (password.length >= 7) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }

    if (photo.length > 1) {
      setPhotoIsValid(true);
    } else {
      setPhotoIsValid(false);
    }
  }, [name, password, photo]);

  const onPhotoClickedHandler = () => {
    dispatch(uiActions.photoClicked());
  };

  const onPhotoChangeHandler = (event) => {
    setPhoto(event.target.value);
  };

  const onPhotoSubmitHandler = () => {
    dispatch(editPhoto(token, photo));
  };

  const onPhotoDeleteHandler = () => {
    dispatch(editPhoto(token, ""));
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
          <div className={classes["account-info__name"]}>
            <h4>My Name:</h4>
            <p>{userName || ""}</p>
          </div>
          <div className={classes["account-info__email"]}>
            <h4>My E-Mail:</h4>
            <p>{user}</p>
          </div>
        </div>
        <div className={classes["account-info__right"]}>
          <img
            alt="My Photo"
            src={userPhoto || profileImage}
            className={
              userPhoto ? classes["user-image"] : classes["default-photo"]
            }
          />
          <button onClick={onPhotoClickedHandler}>Edit</button>
        </div>
      </div>
      {photoIsClicked && (
        <Modal className={classes["new-photo"]}>
          <label htmlFor="new-photo">Add new photo</label>
          <input id="new-photo" type="text" onChange={onPhotoChangeHandler} />
          <button onClick={onPhotoSubmitHandler} disabled={!photoIsValid}>
            Submit
          </button>
          <button onClick={onPhotoDeleteHandler}>Delete Photo</button>
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

          <div
            className={`${classes["name-edit-body"]} ${
              nameIsClicked
                ? classes["show-edit-body"]
                : classes["hide-edit-body"]
            }`}
          >
            <div className={classes["name-edit-input"]}>
              <label htmlFor="new-name">New Name:</label>
              <input type="text" id="new-name" onChange={onNameChangeHandler} className={classes["name-input"]}/>
              <button onClick={onNameSubmitHandler} disabled={!nameIsValid} className={classes["name-input-button"]}>
                Submit
              </button>
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
                  value={password}
                  onChange={onPasswordChangeHandler}
                  className={classes["password-input"]}
                />
                <button
                  onClick={onPasswordSubmitHandler}
                  disabled={!passwordIsValid}
                  className={classes["password-input-button"]}
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
