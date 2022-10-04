import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import bikesSlice from "./bikes-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
import ordersSlice from "./previous-orders-slice";

const store = configureStore({
  reducer: {
    bikes: bikesSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export default store;
