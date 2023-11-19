import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import astronaut from "./astronautSlice";
import buildings from "./buildingsSlice";
import funds from "./fundsSlice";
import loading from "./loadingSlice";
import rocket from "./rocketSlice";
import user from "./userSlice/userSlice";
import { onAppLoad } from "./userSlice/thunks";

export const rootReducer = combineReducers({
  user,
  astronaut,
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

store.dispatch(onAppLoad());
