// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { setCurrentSchedule } from "../models/actions/scheduleActions";
import { token } from "../models/selectors/loginSelectors";
import Day from "./Day";
import SliderDays from "./SliderDays";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { updatedCurrentSchedule } from "../utils";
import Slider from "react-slick";
import { allCars } from "../models/selectors/scheduleSelectors";

const Calendar = ({
  currentSchedule,
  open,
  allDatesFirstRow,
  allDatesSecondRow,
  fetchCurrentSchedule,
}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(token);

  const findToday = () => {
    return [...allDatesFirstRow, ...allDatesSecondRow].findIndex(
      (d) =>
        d.dateToDisplay ===
        new Date()?.toLocaleDateString("el-GR", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        })
    );
  };

  const handleDrop = async (car, day, item) => {
    const currentScheduleId = currentSchedule?.scheduleId;

    const itemAlreadyExistsInSuchDayAndCar =
      item.draggableCategory === 1
        ? currentSchedule?.days?.[day]?.cars?.[car]?.drivers.filter(
            (dr) => dr.id === item.id
          )?.length ||
          currentSchedule?.days?.[day]?.cars?.[99]?.drivers.filter(
            (dr) => dr.id === item.id
          )?.length
        : currentSchedule?.days?.[day]?.cars?.[car]?.regions.filter(
            (rg) => rg.id === item.id
          )?.length;
    if (!itemAlreadyExistsInSuchDayAndCar) {
      try {
        // @ts-ignore
        const resp = await fetch(
          `${import.meta.env.VITE_API_URL}/api/schedules/current/addItem`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            method: "POST",
            body: JSON.stringify({
              scheduleId: currentScheduleId,
              day,
              carId: car,
              item,
            }),
          }
        );

        const res = await resp.json();

        if (res.error) {
          enqueueSnackbar(res.error, { variant: "error" });
        } else {
          const updatedSchedule = updatedCurrentSchedule(
            currentSchedule,
            day,
            car,
            item
          );

          dispatch(setCurrentSchedule(updatedSchedule));
        }
      } catch (error) {
        enqueueSnackbar(error, { variant: "error" });
      }
    } else {
      enqueueSnackbar(
        "Το αντικείμενο υπάρχει ήδη στην λίστα των οδηγών, tasks ή απόντων.",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <div className={`main-content ${open ? "open" : ""}`}>
      <Box>
        <Box className="days-row-container " p={0.5}>
          {[...allDatesFirstRow, ...allDatesSecondRow].map(
            ({ dateToDisplay, accepts }, index) => (
              <Day
                fetchCurrentSchedule={fetchCurrentSchedule}
                scheduleId={currentSchedule?.scheduleId}
                currentSchedule={Object.keys(currentSchedule.days || {}).reduce(
                  (acc, curr) => ({
                    ...acc,
                    [curr]: currentSchedule.days[curr],
                  }),
                  {}
                )}
                day={index + 1}
                dateToDisplay={dateToDisplay}
                accept={accepts}
                onDrop={(car, item) => handleDrop(car, index + 1, item)}
                key={`${dateToDisplay}_${index}`}
              />
            )
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
