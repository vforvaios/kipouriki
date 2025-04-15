import { createAction } from "@reduxjs/toolkit";

const setDraggableItems = createAction("schedule/setDraggableItems");

const setCurrentSchedule = createAction("schedule/setCurrentSchedule");

const setCars = createAction("schedule/setCars");

export { setDraggableItems, setCurrentSchedule, setCars };
