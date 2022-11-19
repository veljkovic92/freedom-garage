import classes from "./NotFound.module.css"
import { useHistory } from "react-router-dom"

const NotFound = () => {
const history = useHistory();

  const onRedirectHandler = () => {
    history.replace("/bikes");
  }

  return <div className={classes["not-found"]}>
<h2 className={classes["not-found"]}>Sorry, this page doesn't exist!</h2>
<p>Please click on the button below to go to "All Bikes" page</p>
<button onClick={onRedirectHandler}>To All Bikes</button>
  </div>
}

export default NotFound;