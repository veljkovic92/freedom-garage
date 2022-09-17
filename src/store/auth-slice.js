import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    userLoggedIn(state) {
      state.isLoggedIn = true;
    },
    userLoggedOut(state) {
      state.isLoggedIn = false;
    },
  },
});


export const authActions = authSlice.actions;

export default authSlice;
