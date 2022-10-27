import { useSelector } from "react-redux";
import classes from "./MyOrders.module.css";
import { MutatingDots } from "react-loader-spinner";

const loadingSpinner = (
  <MutatingDots
    height="100"
    width="100"
    color="#4fa94d"
    secondaryColor="#4fa94d"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{}}
    wrapperClass={classes.spinner}
    visible={true}
  />
);

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.user);
  const ordersLoading = useSelector((state) => state.orders.ordersLoading);
  console.log(user);
  let ordersMap;

  if (ordersLoading === true) {
    ordersMap = loadingSpinner;
  } else if (orders !== null) {
    ordersMap = Object.keys(orders).map((item) => {
      if (orders[item].user === user) {
        return (
          
            
            <ul className={classes.orders} key={item}>
              <li className={classes["order-item"]}>
                {orders[item].configs.map((configData) => {
                  return (
                    <div key={configData.id}>
                      <div className={classes["order-item-top"]}>
                        <h3>"{configData.name}"</h3>
                        <div>
                          <span>
                            <em>
                              Ordered on:<strong> {configData.date}</strong>
                            </em>
                          </span>
                        </div>
                      </div>
                      <ul className={classes["item-config-list"]}>
                        {Object.keys(configData.config).map((configItem) => {
                          return (
                            <li
                              className={classes["item-config"]}
                              key={configItem}
                            >
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
                                  Waiting Time:
                                  {configData.config[configItem].waitingTime}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </li>
              <div className={classes["order-summary"]}>
                <span>
                  <strong>
                    Total Bikes in Order: {orders[item].totalQuantity}
                  </strong>
                </span>
                <span>
                  <strong>Total Order Price: {orders[item].totalPrice}</strong>
                </span>
                <span>
                  <strong>
                    Total Order Waiting Time: {orders[item].waitingTime}
                  </strong>
                </span>
              </div>
            </ul>
          
        );
      }
    });
  }

  return (
    <>
      {orders === null && <h2 className="page-header">No previous Orders found!</h2>}
      {orders !== null && <h2 className="page-header">My Orders List</h2>} 
      {ordersMap}
    </>
  );
};

export default MyOrders;
