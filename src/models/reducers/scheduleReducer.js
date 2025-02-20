import { createReducer } from "@reduxjs/toolkit";
import { setDraggableItems } from "../actions/scheduleActions";

const initialState = {
  draggableItems: [],
};
const scheduleReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDraggableItems, (state, action) => ({
    ...state,
    draggableItems: action.payload,
  }));
});

export default scheduleReducer;
