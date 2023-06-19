import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkingAreaElement, WorkingAreaElementState } from '../domain/WorkingArea';

const initialState: WorkingAreaElementState = {
  elements: []
};

export const workingAreaSlice = createSlice({
  name: 'workingAreaElements',
  initialState,
  reducers: {
    addElement: (state: WorkingAreaElementState, action: PayloadAction<WorkingAreaElement>) => {
      state.elements = [...state.elements, action.payload];
    }
  }
});

export const { addElement } = workingAreaSlice.actions;
export default workingAreaSlice.reducer;
