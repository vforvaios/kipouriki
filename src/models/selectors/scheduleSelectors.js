const allDraggables = ({ scheduleReducer }) => scheduleReducer.draggableItems;
const allCars = ({ scheduleReducer }) => scheduleReducer.cars;

const currentSchedule = ({ scheduleReducer }) =>
  scheduleReducer.currentSchedule;

export { allDraggables, currentSchedule, allCars };
