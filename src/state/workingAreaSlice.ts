import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../domain/Item';

const initialState: WorkingAreaState = {
  items: [],
  draggingItemIndex: undefined
};

export const workingAreaSlice = createSlice({
  name: 'workingAreaItems',
  initialState,
  reducers: {
    setDraggingItemIndex: (state: WorkingAreaState, action: PayloadAction<number | undefined>) => {
      state.draggingItemIndex = action.payload;
    },
    addItem: (state: WorkingAreaState, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    },
    updateItemCoordinates: (state: WorkingAreaState, action: PayloadAction<UpdateItemPayload>) => {
      const { index, x, y } = action.payload;
      const item = state.items[index];

      state.items[index] = { ...item, x, y };
    }
  }
});

interface WorkingAreaState {
  items: Item[];
  draggingItemIndex: number | undefined;
}

interface UpdateItemPayload {
  index: number;
  x: number;
  y: number;
}
