import { createAction } from "@reduxjs/toolkit";

const setDraggableItems = createAction("schedule/setDraggableItems");
const setCurrentSchedule = createAction("schedule/setCurrentSchedule");

export { setDraggableItems, setCurrentSchedule };
