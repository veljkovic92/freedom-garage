import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./BikeItem.module.css";

const BikeItem = (props) => {
  const history = useHistory();
  const price = props.price;
  console.log(props);

  const onConfigureHandler = () => {
    history.push(`/bikes/${props.name.toLowerCase()}`);
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
