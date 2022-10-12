import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", isLoggedIn: false },
  reducers: {
    userLoggedIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    userLoggedOut(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
    localToken (state, action) {
      state.token = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
