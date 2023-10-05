import { configureStore } from "@reduxjs/toolkit";
import some from "./loadingSlice";
import funds from "./fundsSlice";
import buildings, { fetchBuildings } from "./buildingsSlice";
import loading from "./loadingSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ some, funds, buildings, loading });

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

store.dispatch(fetchBuildings());
