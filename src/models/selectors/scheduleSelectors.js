const allDraggables = ({ scheduleReducer }) => scheduleReducer.draggableItems;

const currentSchedule = ({ scheduleReducer }) =>
  scheduleReducer.currentSchedule;

export { allDraggables, currentSchedule };
