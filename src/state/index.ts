import { configureStore } from "@reduxjs/toolkit";
import WorkingAreaElementReducer from "./WorkingAreaElementReducer";

export const store = configureStore({
  reducer: {
    workingAreaElements: WorkingAreaElementReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
