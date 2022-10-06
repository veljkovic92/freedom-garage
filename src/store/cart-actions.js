import { fetchOrdersData } from "./previous-orders-actions";

export const setOrdersData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-de4ad-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "PUT",
          body: JSON.stringify({
            cartId: cart.cartId,
            configs: cart.cartItems,
            waitingTime: cart.totalWaitingTime,
            totalQuantity: cart.totalQuantity,
            totalPrice: cart.totalPrice,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Can't set configs");
      }
    };
    try {
      await sendRequest();
      dispatch(fetchOrdersData());
    } catch (error) {}
  };
};
