import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Tooltip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn, token } from "../models/selectors/loginSelectors";
import { currentSchedule } from "../models/selectors/scheduleSelectors";
import { setCurrentSchedule } from "../models/actions/scheduleActions";
import { enqueueSnackbar } from "notistack";

const ListOfItems = ({
  day,
  type,
  droppedItems,
  onDrop,
  accept,
  car,
  scheduleId,
  fetchCurrentSchedule,
}) => {
  const [removingLoading, setRemovingLoading] = useState(false);
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector(userLoggedIn);
  const userToken = useSelector(token);
  const schedule = useSelector(currentSchedule);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleRemoveItemFormList = async (itm, day, car) => {
    setRemovingLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/api/schedules/current/removeItem`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          method: "POST",
          body: JSON.stringify({
            scheduleId,
            day,
            carId: car,
            item: itm,
          }),
        }
      );

      const res = await resp.json();
      if (res.error) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        await fetchCurrentSchedule();
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    } finally {
      setRemovingLoading(false);
    }
  };

  const isActive = isOver && canDrop;

  let cls = "";
  if (isActive) {
    cls = "isActive";
  } else if (canDrop) {
    cls = "isDroppable";
  }

  return (
    <>
      <ul
        ref={drop}
        className={`droppable-container list ${
          type === "drivers" ? "drivers-list" : ""
        } ${type === "regions" ? "regions-list" : ""} ${
          type === "absentDrivers" ? "drivers-list absences" : ""
        } ${cls} ${removingLoading ? "removing" : ""}`}
      >
        {droppedItems?.map((itm) => (
          <li key={itm.id}>
            <Tooltip title={itm.name}>
              <Typography className={`${userIsLoggedIn ? "removable" : ""}`}>
                <span>{itm.name}</span>
                {userIsLoggedIn && (
                  <button
                    onClick={() => handleRemoveItemFormList(itm, day, car)}
                  >
                    x
                  </button>
                )}
              </Typography>
            </Tooltip>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListOfItems;
