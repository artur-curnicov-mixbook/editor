import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../domain/Item';

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

interface WorkingAreaState {
  items: Item[];
}
