import classes from "./Authentication.module.css";
import AuthForm from "../components/AuthForm/AuthForm";

const Authentication = () => {
  return (
    <div className={classes.auth}>
      <AuthForm />
    </div>
  );
};

export default Authentication;
