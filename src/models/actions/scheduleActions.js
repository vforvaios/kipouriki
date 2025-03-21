import { createAction } from "@reduxjs/toolkit";

const setDraggableItems = createAction("schedule/setDraggableItems");
const setDraggableInactiveItems = createAction(
  "schedule/setDraggableInactiveItems"
);
const setCurrentSchedule = createAction("schedule/setCurrentSchedule");

export { setDraggableItems, setCurrentSchedule, setDraggableInactiveItems };
