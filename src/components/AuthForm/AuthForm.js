import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./AuthForm.module.css";
import {
  expirationHandler,
  expirationTimeHandler,
} from "../../helpers/expiration";
import { ThreeDots } from "react-loader-spinner";
import { uiActions } from "../../store/ui-slice";
import ConfigNotification from "../Layout/ConfigNotification";

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const notification = useSelector(state => state.ui.notification)

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [signUpMode, setSignUpMode] = useState(true);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredPasswordIsValid = enteredPassword.length > 6;

  useEffect(() => {
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  }, [signUpMode]);

  const enteredEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const enteredPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const enteredEmailBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const enteredPasswordBlurHandler = () => {
    setEnteredPasswordTouched(true);
  };

  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  const enteredPasswordIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

  const authModeHandler = () => {
    setSignUpMode((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setIsAuthenticating(true);

    let url;

    if (signUpMode) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I";
    }

    (async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await res.json();

        let errorMessage = "Authentification failed!";

        if (data && data.error && data.error.message) {
    
          errorMessage = data.error.message;
          throw new Error(errorMessage);
        }

        const userData = {
          user: data.email,
          token: data.idToken,
        };

        dispatch(authActions.userLoggedIn(userData));
        setIsAuthenticating(false);
        expirationTimeHandler(data.expiresIn);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", true);

        history.replace("/welcome");
        
      } catch (error) {
        setIsAuthenticating(false);
        dispatch(uiActions.showNotification({
          status: error.message,
          title: error.message
        }))
        
      }
    })();

    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {isAuthenticating && (
        <ThreeDots
          height="80"
          width="150"
          radius="200"
          color="rgb(265,65,65)"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
      {!isAuthenticating && (
        <>
          <h2>{signUpMode ? "Sign Up" : "Log In"}</h2>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={enteredEmail}
            onChange={enteredEmailHandler}
            onBlur={enteredEmailBlurHandler}
            className={enteredEmailIsInvalid ? classes.invalid : undefined}
          ></input>
          {enteredEmailIsInvalid && (
            <p className={classes.invalid}>Please add valid e-mail account.</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={enteredPassword}
            onChange={enteredPasswordHandler}
            onBlur={enteredPasswordBlurHandler}
            className={enteredPasswordIsInvalid ? classes.invalid : undefined}
          ></input>

          {enteredPasswordIsInvalid && (
            <p className={classes.invalid}>
              Please add password longer than 6 characters.
            </p>
          )}

          <button disabled={!formIsValid} className={classes.formBtn}>
            {signUpMode ? "Sign Up" : "Log In"}
          </button>
          <button
            onClick={authModeHandler}
            className={classes.btnMode}
            type="button"
          >
            {signUpMode ? "Already a member?" : "Not registered yet?"}
          </button>
        </>
      )}
      {!isAuthenticating && notification && (
        <ConfigNotification title={notification.title}/>
      )}
    </form>
  );
};

export default AuthForm;
