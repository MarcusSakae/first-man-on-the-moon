import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const rocketSlice = createSlice({
  name: "rocket",
  initialState: {
    height: 1,
    speed: 0,
  },
  reducers: {
    setHeight: (state, action) => ({ ...state, height: action.payload }),
    increaseHeight: (state, action) => ({ ...state, height: state.height + 1 }),
  },
});

export default rocketSlice.reducer;
