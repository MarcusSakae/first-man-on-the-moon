import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const loadingSlice = createSlice({
  name: "loading",
  initialState: { api: false },
  reducers: {
    startLoading: (state) => {
      state.api = true;
    },
    stopLoading: (state) => {
      state.api = false;
    },
  },
});

export default loadingSlice.reducer;
