import React from "react";
import { useDrop } from "react-dnd";
import { Tooltip, Typography } from "@mui/material";

const DriversList = ({ droppedItems, onDrop, accept }) => {
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
    <ul ref={drop} className={`droppable-container list drivers-list ${cls}`}>
      {droppedItems?.map((itm) => (
        <li key={itm}>
          <Tooltip title={itm}>
            <Typography>{itm}</Typography>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default DriversList;
