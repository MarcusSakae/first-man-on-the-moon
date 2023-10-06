import { createSlice } from "@reduxjs/toolkit";
import { BuildingSlot } from "../models/building";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { apiFetch } from "../utils/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export const fetchUser = createAsyncThunk("user/fetch", async (_: void) => {
  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId) {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }
  try {
    let response = await apiFetch(`/user/load/${deviceId}`);
    return response.json();
  } catch (e) {
    Toast.show({
      type: "error",
      text1: "Error fetching user data",
      text2: "Please try again later",
    });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    buildingSlots: [] as BuildingSlot[],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.buildingSlots.push(...action.payload.building_slots);
        state.isLoading = false;
      }
    });
  },
});

export default userSlice.reducer;
