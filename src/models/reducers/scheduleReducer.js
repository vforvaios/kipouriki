import { createReducer } from "@reduxjs/toolkit";
import {
  setDraggableItems,
  setCurrentSchedule,
  setDraggableInactiveItems,
} from "../actions/scheduleActions";

const initialState = {
  draggableItems: [],
  draggableInactiveItems: [],
  currentSchedule: {},
};
const scheduleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDraggableItems, (state, action) => ({
      ...state,
      draggableItems: action.payload,
    }))
    .addCase(setDraggableInactiveItems, (state, action) => ({
      ...state,
      draggableInactiveItems: action.payload,
    }))
    .addCase(setCurrentSchedule, (state, action) => ({
      ...state,
      currentSchedule: action.payload,
    }));
});

export default scheduleReducer;
