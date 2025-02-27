import React from "react";
import { useDrop } from "react-dnd";
import { Tooltip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "../models/selectors/loginSelectors";
import { currentSchedule } from "../models/selectors/scheduleSelectors";
import { setCurrentSchedule } from "../models/actions/scheduleActions";

const ListOfItems = ({ day, type, droppedItems, onDrop, accept, car }) => {
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector(userLoggedIn);
  const schedule = useSelector(currentSchedule);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleRemoveItemFormList = (itm, day, car) => {
    const newSchedule = {
      ...schedule,
      days: {
        ...schedule.days,
        [day]: {
          ...schedule.days[day],
          cars: {
            ...schedule.days[day].cars,
            [car]: {
              ...schedule.days[day].cars?.[car],
              drivers:
                itm.draggable_category_id === 1
                  ? schedule.days[day].cars?.[car]?.drivers?.filter(
                      (driver) => driver.id !== itm.id
                    )
                  : [...schedule.days[day].cars?.[car]?.drivers],
              regions:
                itm.draggable_category_id === 2
                  ? schedule.days[day].cars?.[car]?.regions?.filter(
                      (region) => region.id !== itm.id
                    )
                  : [...schedule.days[day].cars?.[car]?.regions],
            },
          },
        },
      },
    };

    dispatch(setCurrentSchedule(newSchedule));
  };

  const isActive = isOver && canDrop;

  let cls = "";
  if (isActive) {
    cls = "isActive";
  } else if (canDrop) {
    cls = "isDroppable";
  }

  return (
    <ul
      ref={drop}
      className={`droppable-container list ${
        type === "drivers" ? "drivers-list" : ""
      } ${type === "regions" ? "regions-list" : ""} ${
        type === "absentDrivers" ? "drivers-list absences" : ""
      } ${cls}`}
    >
      {droppedItems?.map((itm) => (
        <li key={itm.id}>
          <Tooltip title={itm.name}>
            <Typography className={`${userIsLoggedIn ? "removable" : ""}`}>
              <span>{itm.name}</span>
              {userIsLoggedIn && (
                <button onClick={() => handleRemoveItemFormList(itm, day, car)}>
                  x
                </button>
              )}
            </Typography>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default ListOfItems;
