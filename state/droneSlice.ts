import { createSlice } from "@reduxjs/toolkit";

interface Drone {
  id: string;
  name: string;
  distance: number;
  direction: number;
}

export const droneSlice = createSlice({
  name: "drone",
  initialState: {
    drones: [] as Drone[],
    maxDrones: 1,
  },
  reducers: {
    addDrone: (state, action) => ({
      ...state,
      drones: [...state.drones, action.payload],
    }),
  },
});

export default droneSlice.reducer;
