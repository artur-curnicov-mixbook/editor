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
    },
    updateElements: (state: WorkingAreaState, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    }
  }
});

interface WorkingAreaState {
  items: Item[];
}
