import { configureStore } from '@reduxjs/toolkit';
import ItemsReducer from './ItemsReducer';

export const store = configureStore({
  reducer: {
    workingAreaItems: ItemsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
