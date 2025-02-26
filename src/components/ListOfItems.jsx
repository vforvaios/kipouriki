import React from "react";
import { useDrop } from "react-dnd";
import { Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../models/selectors/loginSelectors";

const ListOfItems = ({ type, droppedItems, onDrop, accept }) => {
  const userIsLoggedIn = useSelector(userLoggedIn);
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
            <Typography className={`${userIsLoggedIn ? "removable" : ""}`}>
              <span>{itm.name}</span>
              {userIsLoggedIn && (
                <button onClick={() => alert("Remove this item")}>x</button>
              )}
            </Typography>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default ListOfItems;
