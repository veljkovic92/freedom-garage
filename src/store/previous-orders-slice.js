import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [] },
  reducers: {
    fetchOrder(state, action) {
      const newOrders = [];
      newOrders.push(action.payload);
      state.orders = newOrders;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
