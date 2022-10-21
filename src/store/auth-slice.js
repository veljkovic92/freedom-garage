import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", user: "", name: "", photoUrl: "", isLoggedIn: false },
  reducers: {
    userLoggedIn(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userLoggedOut(state) {
      state.isLoggedIn = false;
      state.user = "";
      state.token = null;
      state.name = "";
    },
    localToken(state, action) {
      state.token = action.payload;
    },
    localName(state, action) {
      state.name = action.payload;
    },
    localPhotoUrl(state, action) {
      state.photoUrl = action.payload
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
