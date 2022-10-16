import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: null },
  reducers: {
    fetchOrder(state, action) {
      let orders = action.payload;
      if (orders === null) {
        return;
      }

      state.orders = orders;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
