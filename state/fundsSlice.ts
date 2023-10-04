import { createSlice } from "@reduxjs/toolkit";

const fundsSlice = createSlice({
  name: "funds",
  initialState: {
    dollars: 0,
    income: 9, // per sconds
  },
  reducers: {
    incomeTick: (state) => {
      state.dollars += state.income;
    },
  },
});

export const { incomeTick } = fundsSlice.actions;
export default fundsSlice.reducer;
