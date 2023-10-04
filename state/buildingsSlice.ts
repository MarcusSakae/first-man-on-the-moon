import { createSlice } from "@reduxjs/toolkit";
import { Building, BuildingSlot } from "../models/building";
import { API_URL } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBuildings = createAsyncThunk(
  "buildings/fetch",
  async (_thunkAPI) => {
    let url = `${API_URL}/buildings`;
    console.log("url", url);
    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      console.log("error", e);
    }
    if (!response) {
      throw new Error("no response");
    }
    console.log("fetchBuildings", response.status);
    response.json().then((data) => console.log("building", data));
    return response.json();
  }
);

const buildingsSlice = createSlice({
  name: "buildings",
  initialState: {
    buildingSlots: [] as BuildingSlot[],
    availableBuildings: [] as Building[],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBuildings.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.buildingSlots.push(action.payload);
    });
  },
});

export default buildingsSlice.reducer;
