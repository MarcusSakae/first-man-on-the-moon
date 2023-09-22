import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const someSlice = createSlice({
  name: "some",
  initialState: {
    height: 1,
    speed: 0,
  },
  reducers: {
    setHeight: (state, action) => {
      state.height = action.payload.height;
    },
  },
});

export const { setHeight } = someSlice.actions;

export const height = (state: any) => state.height;
export const speed = (state: any) => state.speed;

export default someSlice.reducer;
