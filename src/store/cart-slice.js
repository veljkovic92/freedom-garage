import { createSlice } from "@reduxjs/toolkit";

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
      let configPrice = 0;
      const config = action.payload.config;

      Object.keys(config).forEach((item) => {
        configPrice += config[item].price;
      });

      const newBikeConfig = {
        id: action.payload.id,
        name: action.payload.name,
        config: action.payload.config,
        price: configPrice,
      };
      state.items.push(newBikeConfig);
      state.waitingTime += action.payload.waitingTime;
      state.totalQuantity++;
      state.totalPrice += configPrice;
    },
    removeFromCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity--;
      state.totalPrice -= item.price;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
