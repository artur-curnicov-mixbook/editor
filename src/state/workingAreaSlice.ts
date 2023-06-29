import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../domain/Item';

const initialState: WorkingAreaState = {
  items: [],
  selectedItemIndex: undefined
};

export const workingAreaSlice = createSlice({
  name: 'workingAreaItems',
  initialState,
  reducers: {
    addItem: (state: WorkingAreaState, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    },
    updateItemCoordinates: (state: WorkingAreaState, action: PayloadAction<UpdateItemPayload>) => {
      const { index, x, y } = action.payload;
      const item = state.items[index];

      state.items[index] = { ...item, x, y };
    },
    setSelectedItemIndex: (state: WorkingAreaState, action: PayloadAction<number | undefined>) => {
      state.selectedItemIndex = action.payload;
    },
    moveSelectedItemToFront: (state: WorkingAreaState) => {
      if (state.selectedItemIndex === undefined) return;

      const [element] = state.items.splice(state.selectedItemIndex, 1);
      state.items.push(element);
      state.selectedItemIndex = state.items.length - 1;
    },
    moveSelectedItemToBack: (state: WorkingAreaState) => {
      if (state.selectedItemIndex === undefined) return;

      const [element] = state.items.splice(state.selectedItemIndex, 1);
      state.items.unshift(element);
      state.selectedItemIndex = 0;
    }
  }
});

interface WorkingAreaState {
  items: Item[];
  selectedItemIndex: number | undefined;
}

interface UpdateItemPayload {
  index: number;
  x: number;
  y: number;
}
