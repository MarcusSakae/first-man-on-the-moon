import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { AstronautSlot, Building, BuildingSlot } from "../../models/building";
import { apiFetch } from "../../utils/client";
import { type RootState } from "../store";
type AddBuildingProps = { payload: CreateBuildingPayload };
/**
 * SLice
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    buildingSlots: [] as BuildingSlot[],
    astronautSlots: [] as AstronautSlot[],
    availableTabs: [] as string[],
    isLoading: false,
  },
  reducers: {
    addBuildingToSlot(state, action: AddBuildingProps) {
      let slot = state.buildingSlots.find((slot) => slot.id === action.payload.slotId);
      if (slot) slot.building = action.payload.building;
    },
    demolishBuildingInSlot(state, action: { payload: { slotId: string } }) {
      let slot = state.buildingSlots.find((slot) => slot.id === action.payload.slotId);
      if (slot) slot.building = undefined;
    },
    setAvailableTabs(state, action: { payload: { tabs: string[] } }) {
      state.availableTabs = action.payload.tabs;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.buildingSlots.push(...action.payload.building_slots);
        state.astronautSlots = state.buildingSlots
          .filter((slot) => slot.building && slot.building.astronaut_slots?.length > 0)
          .flatMap((slot) => slot.building!.astronaut_slots);
        state.isLoading = false;
      }
    });
    // update astronaut slots whenever there is a change to buuldings
    builder.addCase(createBuilding.fulfilled, (state, action) => {
      let buildingsWithSlots = state.buildingSlots.filter(
        (slot) => slot.building && slot.building.astronaut_slots?.length > 0
      );
      let updatedAstronautSlots = buildingsWithSlots.flatMap((slot) => slot.building!.astronaut_slots);
      state.astronautSlots = updatedAstronautSlots;
    });
  },
});
export default userSlice.reducer;
export const {  addBuildingToSlot, demolishBuildingInSlot, setAvailableTabs } = userSlice.actions;

/**
 * Thunks
 */
export const fetchUser = createAsyncThunk("user/fetch", async (_: void) => {
  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId) {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }
  let response = await apiFetch(`/user/load/${deviceId}`);
  return response.json();
});

export type CreateBuildingPayload = { slotId: string; building: Building };

export const createBuilding = createAsyncThunk<void, CreateBuildingPayload>(
  "user/createBuilding",
  async (payload, { dispatch, getState }) => {
    const { user } = getState() as RootState;

    // TODO: Do api call to create building in API here

    dispatch(addBuildingToSlot(payload));

    // Refactor into separate function
    const tabs = [...user.availableTabs];
    if (payload.building.kind == "Housing" && !tabs.includes("astronauts")) {
      tabs.push("astronauts");
      Toast.show({ text1: "Astronauts" });
    }
    // we can only ever increase the number of tabs, never remove an unlocked tab
    if (tabs.length > user.availableTabs.length) {
      dispatch(setAvailableTabs({ tabs }));
    }
  }
  
);
export const upgradeBuilding = createAsyncThunk<void, CreateBuildingPayload>(
  "user/createBuilding",
  async (payload, { dispatch, getState }) => {
    const { user } = getState() as RootState;

    // TODO: Do api call to create building in API here

    dispatch(addBuildingToSlot(payload));

    // Refactor into separate function
    const tabs = [...user.availableTabs];
    if (payload.building.kind == "Housing" && !tabs.includes("astronauts")) {
      tabs.push("astronauts");
      Toast.show({ text1: "Astronauts" });
    }
    // we can only ever increase the number of tabs, never remove an unlocked tab
    if (tabs.length > user.availableTabs.length) {
      dispatch(setAvailableTabs({ tabs }));
    }
  }
);
