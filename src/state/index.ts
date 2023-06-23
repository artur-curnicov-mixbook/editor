import { configureStore } from '@reduxjs/toolkit';
import { workingAreaSlice } from './workingAreaSlice';

export const store = configureStore({
  reducer: {
    workingAreaItems: workingAreaSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
