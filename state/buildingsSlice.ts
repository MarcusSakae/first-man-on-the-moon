import { createSlice } from "@reduxjs/toolkit";
import { Building, BuildingSlot } from "../models/building";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { apiFetch } from "../utils/client";

export const fetchBuildings = createAsyncThunk(
  "buildings/fetch",
  async (_: void, { dispatch }) => {
    try {
      dispatch({ type: "loading/startLoading" });
      let response = await apiFetch(`/buildings`);
      return response.json();
    } catch (e) {
      console.log("erro", e);
      Toast.show({
        type: "error",
        text1: "Error fetching buildings",
        text2: "Please try again later",
      });
    } finally {
      dispatch({ type: "loading/stopLoading" });
    }
  }
);

const buildingsSlice = createSlice({
  name: "buildings",
  initialState: {
    buildingSlots: [] as BuildingSlot[],
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
        state.buildingSlots.push(action.payload);
        state.isLoading = false;
      }
    });
  },
});

export default buildingsSlice.reducer;
