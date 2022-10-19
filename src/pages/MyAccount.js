import { useSelector } from "react-redux";
import classes from "./MyAccount.module.css";
import profileImage from "../assets/profile-template.jpg";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

const MyAccount = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.name);

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

  const onNameSubmitHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            returnSecureToken: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      let errorMessage = "Authentification failed!";

      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
        throw new Error(errorMessage);
      }

      if (response.ok) {
        console.log("Name changed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPasswordClickedHandler = () => {
    setPasswordIsClicked((prevValue) => !prevValue);
  };

  const onPasswordChangeHandler = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const onPasswordSubmitHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            password: password,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();

      let errorMessage = "Authentification failed!";

      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
        throw new Error(errorMessage);
      }

      if (response.ok) {
        console.log("Password changed");
      }
    } catch (error) {
      console.log(error);
    }
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
