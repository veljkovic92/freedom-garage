import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
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
      // const currentState = current(state.items);

      // const selectedItem = currentState.find(
      //   (item) => item.id == action.payload.id
      // );
      // console.log(selectedItem);
      // let newConfigPrice = selectedItem.config[action.payload.buttonName].price;
      // let newConfigWaitingTime =
      //   selectedItem.config[action.payload.buttonName].waitingTime;

      // newConfigPrice = action.payload.chosenUpgradePrice;
      // newConfigPrice = action.payload.chosenUpgradeWaitingTime;

      // console.log(state.items);
      const currentState = current(state.items);
      const selectedConfig = currentState.find(
        (config) => config.id === action.payload.id
      );
      // Change the storing method of items from null to object and change code everywhere where needed
      let selectedUpgradePrice =
        selectedConfig.config[action.payload.name].price;
      selectedUpgradePrice = action.payload.chosenUpgradePrice;

      let selectedUpgradeWaitingTime =
        selectedConfig.config[action.payload.name].waitingTime;
      selectedUpgradePrice = action.payload.chosenUpgradePrice;
      selectedUpgradeWaitingTime = action.payload.chosenUpgradeWaitingTime;
      current((state.items[0].name = "zoran"));
      console.log(current(state.items));
    },
    removeItemFromCart(state, action) {
      const selectedItem = state.items.find(
        (item) => item.name === action.payload
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
