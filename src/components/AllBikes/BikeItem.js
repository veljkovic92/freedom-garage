import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./BikeItem.module.css";

const BikeItem = (props) => {
  const history = useHistory();
  const price = props.price;

  const onConfigureHandler = () => {
    if (props.id === "1") {
      history.push("/bikes/dragon");
    } else if (props.id === "2") {
      history.push("/bikes/firestorm");
    } else if (props.id === "3") {
      history.push("/bikes/raptor");
    } else if (props.id === "4") {
      history.push("/bikes/thunderstorm");
    }
  };

  return (
    <Card className={classes["bike-item"]} onClick={onConfigureHandler}>
      <div className={classes["left-box"]}>
        <img src={props.img}></img>
      </div>
      <div className={classes["right-box"]}>
        <div className={classes["right-top-box"]}>
          <h2>{props.name}</h2>
          <span className={classes.price}>{price} eur</span>
        </div>
        <div>
          <p>{props.desc}</p>
        </div>
        <button onClick={onConfigureHandler}>Configure</button>
      </div>
    </Card>
  );
};

export default BikeItem;
