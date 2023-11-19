import Toast from "react-native-toast-message";
import { type RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { apiFetch } from "../../utils/client";
import { Building } from "../../models/building";
import { Astronaut } from "../../models/astronaut";
import { fetchBuildings } from "../buildingsSlice";

export type CreateBuildingPayload = { slotId: string; building: Building };
export type AddBuildingProps = { payload: CreateBuildingPayload };

export const onAppLoad = createAsyncThunk<void, void>("user/onAppLoad", async (_: void, { dispatch }) => {
  await dispatch(fetchBuildings());
  await dispatch(loadUserState());
  await dispatch(unlockTabs());
});

/**
 * Unlocks tab when a building is created
 */
export const unlockTabBasedOnBuilding = createAsyncThunk<void, string>(
  "user/unlockTabBasedOnBuilding",
  (buildingKind: string, { dispatch, getState }) => {
    const { user } = getState() as RootState;
    const tabs = [...user.availableTabs];
    if (buildingKind == "Housing" && !tabs.includes("astronauts")) {
      tabs.push("astronauts");
      Toast.show({ text1: "Astronauts" });
    }
    if (tabs.length > user.availableTabs.length) {
      dispatch({ type: "user/setAvailableTabs", payload: { tabs } });
    }
  }
);

/**
 * unlocks tab based on current state (maybe we only need this one)
 */
export const unlockTabs = createAsyncThunk<void>("user/unlockTabs", (_: void, { dispatch, getState }) => {
  const tabs = [];
  const { user } = getState() as RootState;
  if (user.buildingSlots.filter((slot) => slot.building?.kind == "Housing").length > 0) {
    tabs.push("astronauts");
  }
  dispatch({ type: "user/setAvailableTabs", payload: { tabs } });
});

/**
 *
 */
export const loadUserState = createAsyncThunk("user/loadUserState", async (_: void) => {
  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId) {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }
  return apiFetch(`/user/load/${deviceId}`);
});

/**
 *
 */
export const saveUserState = createAsyncThunk("user/saveUserState", async (_: void) => {
  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId) {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }
  let json = await apiFetch(`/user/load/${deviceId}`);
  console.log("user/saveUserState", JSON.stringify(json, null, 2));
  return json;
});

/**
 *
 */
export const createBuilding = createAsyncThunk<void, CreateBuildingPayload>(
  "user/createBuilding",
  async (payload, { dispatch, getState }) => {
    let { user } = getState() as RootState;
    let json = await apiFetch(`/buildings/build`, {
      method: "POST",
      body: JSON.stringify({
        device_id: user.device_id,
        building_id: payload.building.id,
      }),
    });
    console.log("!!!!!!!!!!!!!!!!", json);

    console.log("user/createBuilding", json);
    dispatch({ type: "user/addBuildingToSlot", payload });
    dispatch(unlockTabBasedOnBuilding(payload.building.kind));
  }
);

/**
 *
 */
export const hireAstronaut = createAsyncThunk<Astronaut, Astronaut>(
  "astronaut/hire",
  async (astronaut: Astronaut, { getState, dispatch }) => {
    console.log("user/hireAstronaut", astronaut);
    let { user } = getState() as RootState;
    await dispatch(saveUserState());
    let json = await apiFetch(`/astronauts/hire`, {
      method: "POST",
      body: JSON.stringify({
        device_id: user.device_id,
        astronaut_id: astronaut.id,
      }),
    });
    console.log("user/hireAstronaut", json);
    return Promise.resolve(astronaut);
  }
);
