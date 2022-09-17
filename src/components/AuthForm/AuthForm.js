import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(authActions.userLoggedIn());
    history.replace("/welcome");

    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  const authModeHandler = () => {
    setSignUpMode((prevState) => !prevState);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
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
    </form>
  );
};

export default AuthForm;
