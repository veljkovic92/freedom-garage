import { cartActions } from "./cart-slice";

export const setCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-de4ad-default-rtdb.europe-west1.firebasedatabase.app/configsCart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            configs: cart.configs,
            waitingTime: cart.waitingTime,
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
    } catch (error) {}
  };
};
