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
      state.items[action.payload.index] = action.payload.item;
    }
  }
});

interface WorkingAreaState {
  items: Item[];
}

interface UpdateItemPayload {
  item: Item;
  index: number;
}
