import { ordersActions } from "./previous-orders-slice";

export const fetchOrdersData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-de4ad-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );
      if (!response.ok) {
        throw new Error("Can't set configs");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await sendRequest();
      dispatch(ordersActions.fetchOrder(cartData));
    } catch (error) {}
  };
};
