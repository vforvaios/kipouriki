import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { userLoggedIn, token } from "../models/selectors/loginSelectors";
import { enqueueSnackbar } from "notistack";
import { regionCategories } from "../constants";
import ManipulateListItemModal from "./ManipulateListItemModal";

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
  const initialPopperState = {
    anchorEl: null,
    open: false,
    itm: null,
    day: null,
    car: null,
  };
  const [popperStateForRemoving, setPopperStateForRemoving] =
    useState(initialPopperState);
  const userIsLoggedIn = useSelector(userLoggedIn);
  const userToken = useSelector(token);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleConvertDone = async (itm, day, car) => {
    try {
      setRemovingLoading(true);
      console.log(itm);
      console.log(day);
      console.log(car);
    } catch (error) {
    } finally {
      setRemovingLoading(false);
      setPopperStateForRemoving(initialPopperState);
    }
  };

  const handleRemoveItemFormList = async (itm, day, car) => {
    setRemovingLoading(true);
    try {
      const resp = await fetch(
        // @ts-ignore
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
      setPopperStateForRemoving(initialPopperState);
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
            <Tooltip
              placement="top"
              title={`${itm.name} ${
                itm?.draggable_category_id === 2
                  ? regionCategories?.[itm.region_category].toUpperCase()
                  : ""
              }`}
            >
              <Typography
                className={`${
                  itm?.draggable_category_id === 2
                    ? `${regionCategories?.[itm?.region_category]}`
                    : ""
                } ${userIsLoggedIn ? "removable" : ""} ${
                  itm?.draggable_category_id === 2 && !itm.isDone
                    ? "not-done"
                    : ""
                }`}
                onClick={(e) => {
                  if (userIsLoggedIn) {
                    setPopperStateForRemoving(initialPopperState);
                    setPopperStateForRemoving({
                      anchorEl: e.currentTarget,
                      open: !popperStateForRemoving.open,
                      itm,
                      day,
                      car,
                    });
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <span>{itm.name}</span>
              </Typography>
            </Tooltip>
          </li>
        ))}
      </ul>
      {userIsLoggedIn && (
        <ManipulateListItemModal
          initialPopperState={initialPopperState}
          setPopperStateForRemoving={setPopperStateForRemoving}
          popperStateForRemoving={popperStateForRemoving}
          type={type}
          handleConvertDone={handleConvertDone}
          handleRemoveItemFormList={handleRemoveItemFormList}
        />
      )}
    </>
  );
};

export default ListOfItems;
