import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../utils/client";
import { Astronaut } from "../models/astronaut";

export const fetchAstronauts = createAsyncThunk<Astronaut[]>("astronaut/fetch", async (_: void) => {
  let response = await apiFetch(`/astronauts`);
  // console.log("astronauts....", JSON.stringify(await response.json(),null,2));
  return response.json() as Astronaut[];
});


const astronautSlice = createSlice({
  name: "astronaut",
  initialState: {
    astronauts: [] as Astronaut[],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAstronauts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAstronauts.fulfilled, (state, action) => {
      if (action.payload) {
        state.astronauts = action.payload;
        state.isLoading = false;
      }
    });
  },
});

export default astronautSlice.reducer;
