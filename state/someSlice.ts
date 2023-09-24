import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const someSlice = createSlice({
  name: "some",
  initialState: {
    height: 1,
    speed: 0,
  },
  reducers: {
    setHeight: (state, action) => ({ ...state, height: action.payload }),
    increaseHeight: (state, action) => ({ ...state, height: state.height + 1 }),
  },
});

export default someSlice.reducer;
