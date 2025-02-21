import { createReducer } from "@reduxjs/toolkit";
import {
  setDraggableItems,
  setCurrentSchedule,
} from "../actions/scheduleActions";

const initialState = {
  draggableItems: [],
  currentSchedule: [],
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
    }));
});

export default scheduleReducer;
