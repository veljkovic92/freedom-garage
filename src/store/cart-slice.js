import { createSlice, current } from "@reduxjs/toolkit";
// resi logiku ubacivanja itema
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

    addItemToCart(state, action) {
      state.items.find((configItem) => {
        if (configItem.id == action.payload.id) {
          configItem.config[action.payload.name].price =
            action.payload.chosenUpgradePrice;
          configItem.config[action.payload.name].waitingTime =
            action.payload.chosenUpgradeWaitingTime;

          configItem.totalConfigPrice += action.payload.chosenUpgradePrice;
          configItem.waitingTime += action.payload.chosenUpgradeWaitingTime;

          state.totalPrice += action.payload.chosenUpgradePrice;
          state.waitingTime += action.payload.chosenUpgradeWaitingTime;
        }
      });
    },

    removeItemFromCart(state, action) {
      const currentState = state.items;
      currentState.find((configItem) => {
        if (configItem.id == action.payload.id) {
          configItem.config[action.payload.name].price = 0;
          configItem.config[action.payload.name].waitingTime = 0;

          configItem.totalConfigPrice -= action.payload.chosenUpgradePrice;
          configItem.waitingTime -= action.payload.chosenUpgradeWaitingTime;

          state.totalPrice -= action.payload.chosenUpgradePrice;
          state.waitingTime -= action.payload.chosenUpgradeWaitingTime;
        }
      });
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
