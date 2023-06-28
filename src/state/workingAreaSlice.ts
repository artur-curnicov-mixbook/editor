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
    updateItems: (state: WorkingAreaState, action: PayloadAction<UpdateItemPayload>) => {
      const { index, x, y } = action.payload;

      const item = state.items[index];

      state.items[index] = { ...item, x, y };
    }
  }
});

interface WorkingAreaState {
  items: Item[];
}

interface UpdateItemPayload {
  index: number;
  x: number;
  y: number;
}
