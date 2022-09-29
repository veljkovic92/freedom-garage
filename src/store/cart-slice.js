import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    inCartAdded: false,
    inCartRemoved: false,
    waitingTime: 0,
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
      state.waitingTime += action.payload.waitingTime;
      state.totalQuantity++;
      state.totalPrice += action.payload.totalConfigPrice;
    },
    removeFromCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity--;
      state.totalPrice -= item.price;
    },
    // NAMESTI DA MOZE DA SE DODAJE ITEM I BRISE
    addItemToCart(state, action) {
      const currentState = state.items;
      currentState.find((configItem) => {
        if (configItem.id == action.payload.id) {
          configItem.config[action.payload.name].price =
            action.payload.chosenUpgradePrice;
          configItem.config[action.payload.name].waitingTime =
            action.payload.chosenUpgradeWaitingTime;

          state.totalPrice += action.payload.chosenUpgradePrice;
          console.log(current(state.items));
        }
      });
    },
    // namesti logiku da ne broji price u plus u nedogled bajco, sa IF ili da uporedi sa cart
    removeItemFromCart(state, action) {
      const currentState = state.items;
      currentState.find((configItem) => {
        if (configItem.id == action.payload.id) {
          configItem.config[action.payload.name].price = 0;
          configItem.config[action.payload.name].waitingTime = 0;

          state.totalPrice -= action.payload.chosenUpgradePrice;
          console.log(current(state.items));
        }
      });
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
