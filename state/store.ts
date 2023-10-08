import { configureStore } from "@reduxjs/toolkit";
import funds from "./fundsSlice";
import buildings, { fetchBuildings } from "./buildingsSlice";
import user, { fetchUser } from "./userSlice";
import loading from "./loadingSlice";
import rocket from "./rocketSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user,
  funds,
  buildings,
  loading,
  rocket,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

store.dispatch(fetchUser());
store.dispatch(fetchBuildings());
