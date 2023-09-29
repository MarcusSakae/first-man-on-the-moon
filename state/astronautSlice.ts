import { createSlice } from "@reduxjs/toolkit";
import { Astronaut } from "../models/astronaut";


export const astronautSlice = createSlice({
  name: "astronaut",
  initialState: {
    astronauts: [] as Astronaut[],
    maxastronauts: 1,
  },
  reducers: {
    addastronaut: (state, action) => ({
      ...state,
      astronauts: [...state.astronauts, action.payload],
    }),
  },
});

export default astronautSlice.reducer;
