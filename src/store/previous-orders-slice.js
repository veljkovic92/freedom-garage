import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: null, ordersLoading: false },
  reducers: {
    fetchOrder(state, action) {
      let orders = action.payload;
      if (orders === null) {
        return;
      }

      state.orders = orders;
    },
    ordersLoading(state, action) {
      state.ordersLoading = action.payload;
    }
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
