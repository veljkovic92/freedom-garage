import { useSelector } from "react-redux";
import classes from "./MyOrders.module.css";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders);

  return orders.map((item) => {
    console.log(item);
    return (
      <ul className={classes.orders} key={item.cartId}>
        <li className={classes["order-item"]}>
          {item.configs.map((configData) => {
            return (
              <div className={classes["order-item-top"]} key={configData.id}>
                <h2>"{configData.name}"</h2>
                <div>
                  <span>
                    <em>
                      Ordered on:<strong> {configData.date}</strong>
                    </em>
                  </span>
                </div>
              </div>
            );
          })}

          {item.configs.map((configData) => {
            return (
              <ul className={classes["item-config-list"]} key={configData.id}>
                {Object.keys(configData.config).map((configItem) => {
                  return (
                    <li className={classes["item-config"]} key={configItem}>
                      <h4>{configData.config[configItem].name}</h4>
                      <div>
                        <span>
                          Price: {configData.config[configItem].price}
                        </span>
                      </div>
                      <div>
                        <span>
                          Value: {configData.config[configItem].value}
                        </span>
                      </div>
                      <div>
                        <span>
                          Waiting Time:{" "}
                          {configData.config[configItem].waitingTime}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          })}

          {item.configs.map((configData) => {
            return (
              <div className={classes["order-item-bot"]} key={configData.id}>
                <div>
                  <span>
                    <em>Total Bike Waiting Time: </em>
                    <strong>{configData.waitingTime}</strong>
                  </span>
                  <span>
                    <em>Total Bike Price: </em>
                    <strong>{configData.totalConfigPrice}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </li>
        <div className={classes["order-summary"]}>
          <span>
            <strong>Total Bikes in Order: {item.totalQuantity}</strong>
          </span>
          <span>
            <strong>Total Order Price: {item.totalPrice}</strong>
          </span>
          <span>
            <strong>Total Order Waiting Time: {item.waitingTime}</strong>
          </span>
        </div>
      </ul>
    );
  });
};

export default MyOrders;
