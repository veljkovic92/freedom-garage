import classes from "./CartItem.module.css";

const CartItem = (props) => {
  // add the date and time of adding to cart

  const config = props.config;
  const boja = "red-color";

  const configMap = Object.keys(config).map((item, index) => {
    return (
      <li key={index} className={classes["cart-item"]}>
        <div>
          <h2>{config[item].name}</h2>
        </div>
        <div>
          <h3>Status</h3>
          {config[item].value !== "none" ? (
            <span className={classes.value}>"Added"</span>
          ) : (
            <span className={`${classes.value} ${classes[boja]}`}>
              "Not Added"
            </span>
          )}
        </div>
        <div>
          <h3>Value</h3>
          <span className={classes.value}>{config[item].value}</span>
        </div>
        <div>
          <h3>Waiting Time</h3>
          <span className={classes.value}>{config[item].waitingTime}</span>
        </div>
        <div>
          <h3>Price</h3>
          <span className={classes.value}>{config[item].price}</span>
        </div>
      </li>
    );
  });

  return configMap;
};

export default CartItem;

{
  /* <p>{props.config.logo[1]}</p>
<p>{props.config.color[1]}</p>
<p>{props.config.wheel[1]}</p>
<p>{props.config.exhaustRange[1]}</p>
<p>{props.config.seat[1]}</p>
<p>{props.config.suspension[1]}</p>
<p>{props.config.brakes[1]}</p>
<p>{props.config.windshield[1]}</p>
<p>{props.config.powerRange[1]}</p> */
}

// probaj da napravis da moze da se automatski popularizuje ova strana
