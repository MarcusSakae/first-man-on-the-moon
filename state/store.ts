import { configureStore } from "@reduxjs/toolkit";
import some from "./someSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ some });

const store = configureStore({
  reducer: rootReducer,
});

export default store;

setInterval(() => {
  store.dispatch({ type: "some/increaseHeight" });
}, 1000);