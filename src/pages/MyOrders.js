import { useSelector } from "react-redux";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders);

  return orders.map((item) => {
    return (
      <ul>
        <li>
          {item.configs.forEach((configData) => {
            Object.keys(configData.config).forEach((configItem) => {
              return (
              <li>
                <span>{configData.config[configItem].name}</span>
                <span>{configData.config[configItem].price}</span>
                <span>{configData.config[configItem].value}</span>
                <span>{configData.config[configItem].waitingTime}</span>
              </li>
              )
            });
            <>
              <span>{configData.date}</span>
              <h1>{configData.name}</h1>
              <span>{configData.totalConfigPrice}</span>
              <span>{configData.waitingTime}</span>
            </>;
          })}
        </li>

        <span>{item.totalPrice}</span>
        <span>{item.totalQuantity}</span>
        <span>{item.waitingTime}</span>
      </ul>
    );
  });
};

export default MyOrders;
