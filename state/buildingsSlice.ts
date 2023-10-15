import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Building } from "../models/building";
import { apiFetch } from "../utils/client";

export const fetchBuildings = createAsyncThunk<Building[]>("buildings/fetch", async (_: void) => {
  let response = await apiFetch(`/buildings`);
  return response.json();
});

const buildingsSlice = createSlice({
  name: "buildings",
  initialState: {
    availableBuildings: [] as Building[],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBuildings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBuildings.fulfilled, (state, action) => {
      if (action.payload) {
        state.availableBuildings.push(...action.payload);
        state.isLoading = false;
      }
    });
  },
});

export default buildingsSlice.reducer;
