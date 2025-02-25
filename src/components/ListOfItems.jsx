import React from "react";
import { useDrop } from "react-dnd";
import { Tooltip, Typography } from "@mui/material";

const ListOfItems = ({ type, droppedItems, onDrop, accept }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

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
            <Typography>{itm.name}</Typography>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default ListOfItems;
