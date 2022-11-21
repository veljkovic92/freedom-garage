import classes from "./NotFound.module.css"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";

const NotFound = () => {
  const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
const history = useHistory();

const buttonText = userLoggedIn ? "To All Bikes" : "To Login Page";

  const onRedirectHandler = () => {
    if (userLoggedIn) {
      history.replace("/bikes");
    } else {
      history.replace("/auth");
    }
  }

  return <div className={classes["not-found"]}>
<h2 className={classes["not-found"]}>Sorry, this page doesn't exist!</h2>
<p>Please click on the button below to go to "All Bikes" page</p>
<button onClick={onRedirectHandler}>{buttonText}</button>
  </div>
}

export default NotFound;