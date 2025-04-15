import { createReducer } from "@reduxjs/toolkit";
import {
  setDraggableItems,
  setCurrentSchedule,
  setCars,
} from "../actions/scheduleActions";

const initialState = {
  draggableItems: [],
  currentSchedule: {},
  cars: [],
};
const scheduleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDraggableItems, (state, action) => ({
      ...state,
      draggableItems: action.payload,
    }))
    .addCase(setCurrentSchedule, (state, action) => ({
      ...state,
      currentSchedule: action.payload,
    }))
    .addCase(setCars, (state, action) => ({
      ...state,
      cars: action.payload,
    }));
});

export default scheduleReducer;
