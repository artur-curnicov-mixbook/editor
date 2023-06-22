import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, WorkingAreaState } from '../domain/WorkingArea';

const initialState: WorkingAreaState = {
  items: []
};

export const workingAreaSlice = createSlice({
  name: 'workingAreaItems',
  initialState,
  reducers: {
    addItem: (state: WorkingAreaState, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    }
  }
});

export const { addItem } = workingAreaSlice.actions;
export default workingAreaSlice.reducer;
