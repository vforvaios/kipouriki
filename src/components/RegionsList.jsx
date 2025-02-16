import React from "react";
import { useDrop } from "react-dnd";
import { Typography, Tooltip } from "@mui/material";

const RegionsList = ({ regions, onDrop, accept }) => {
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
    <ul ref={drop} className={`droppable-container list regions-list ${cls}`}>
      {regions?.map((itm) => (
        <li key={itm}>
          <Tooltip title={itm}>
            <Typography>{itm}</Typography>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default RegionsList;
