import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkingAreaElement } from '../interfaces/WorkingArea/WorkingAreaElement.interface';

export interface WorkingAreaElementState {
  circles: WorkingAreaElement[];
  squares: WorkingAreaElement[];
  triangles: WorkingAreaElement[];
}

const initialState: WorkingAreaElementState = {
  circles: [],
  squares: [],
  triangles: []
};

export const workingAreaSlice = createSlice({
  name: 'workingAreaElements',
  initialState,
  reducers: {
    addCircle: (state: WorkingAreaElementState, action: PayloadAction<WorkingAreaElement>) => {
      state.circles = [...state.circles, action.payload];
    },
    addSquare: (state: WorkingAreaElementState, action: PayloadAction<WorkingAreaElement>) => {
      state.squares = [...state.squares, action.payload];
    },
    addTriangle: (state: WorkingAreaElementState, action: PayloadAction<WorkingAreaElement>) => {
      state.triangles = [...state.triangles, action.payload];
    }
  }
});

export const { addCircle, addSquare, addTriangle } = workingAreaSlice.actions;
export default workingAreaSlice.reducer;
