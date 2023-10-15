import { configureStore } from "@reduxjs/toolkit";
import funds from "./fundsSlice";
import buildings, { fetchBuildings } from "./buildingsSlice";
import user, { fetchUser } from "./userSlice/userSlice";
import loading from "./loadingSlice";
import rocket from "./rocketSlice";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

store.dispatch(fetchUser());
store.dispatch(fetchBuildings());
