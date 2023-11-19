import { createSlice } from "@reduxjs/toolkit";
import { AstronautSlot, BuildingSlot } from "../../models/building";
import { AddBuildingProps, createBuilding, loadUserState } from "./thunks";

/**
 * SLice
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    device_id: "",
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
    setUserId(state, action: { payload: { user_id: string } }) {
      state.device_id = action.payload.user_id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserState.pending, (state, _action) => {
      state.isLoading = true;
    });

    builder.addCase(loadUserState.fulfilled, (state, action) => {
      console.log("#### loadUserState.fulfilled", JSON.stringify(action.payload, null, 2));
      if (action.payload) {
        state.device_id = action.payload.device_id;
        state.buildingSlots.push(...action.payload.building_slots);
        state.astronautSlots = state.buildingSlots
          .filter((slot) => slot.building && slot.building.astronaut_slots?.length > 0)
          .flatMap((slot) => slot.building!.astronaut_slots);
        state.isLoading = false;
      }
    });

    builder.addCase(createBuilding.fulfilled, (state, action) => {
      let buildingsWithSlots = state.buildingSlots.filter(
        (slot) => slot.building && slot.building.astronaut_slots?.length > 0
      );
      let updatedAstronautSlots = buildingsWithSlots.flatMap((slot) => slot.building!.astronaut_slots);
      state.astronautSlots = updatedAstronautSlots;
    });
    // builder.addCase(hireAstronaut.fulfilled, (state, action) => {
    //   let slot = state.astronautSlots.find((slot) => !slot.astronaut_id);
    //   if (slot) slot.astronaut = action.payload;
    // }

    builder.addDefaultCase((state, action) => {
      let ignoredCases = ["funds/incomeTick"];
      if (ignoredCases.includes(action.type)) return;
      console.log("[DEFAULT]", action.type);
    });
  },
});
export default userSlice.reducer;
export const { addBuildingToSlot, demolishBuildingInSlot, setAvailableTabs } = userSlice.actions;
