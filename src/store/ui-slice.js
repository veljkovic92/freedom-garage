import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: null,
    photoClicked: false,
  },
  reducers: {
    showCart(state) {
      state.cartIsVisible = true;
    },
    hideCart(state) {
      state.cartIsVisible = false;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = null;
    },
    photoClicked(state) {
      state.photoClicked = !state.photoClicked;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
