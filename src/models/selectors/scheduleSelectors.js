const allDraggables = ({ scheduleReducer }) => scheduleReducer.draggableItems;
const allInactiveDraggables = ({ scheduleReducer }) =>
  scheduleReducer.draggableInactiveItems;
const currentSchedule = ({ scheduleReducer }) =>
  scheduleReducer.currentSchedule;

export { allDraggables, currentSchedule, allInactiveDraggables };
