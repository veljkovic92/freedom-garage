import { ordersActions } from "./previous-orders-slice";

export const fetchOrdersData = (user) => {
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

// Not ideal logic for setting new orders because it fetches the complete list of each users orders - should be fixed to only send specific request to backend/Firebase and to there change the data

export const updateOrdersData = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-de4ad-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );

      if (!response.ok) {
        throw new Error("Can't set configs");
      }
      const data = await response.json();
      console.log(data);

      const newData = {};

      Object.keys(data).map((item) => {
        if (data[item].user !== user) {
          return (newData[item] = data[item]);
        }
      });
      console.log(newData);
    };
    try {
      sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
