import { createSlice } from "@reduxjs/toolkit";

const bikesSlice = createSlice({
  name: "bikes",
  initialState: { bikes: null, bikesLoading: true },
  reducers: {
    getBikes(state, action) {
      state.bikes = action.payload;
    },
    
  },
});

export const bikesActions = bikesSlice.actions;

export default bikesSlice;
