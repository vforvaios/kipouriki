import React from "react";
import { setCurrentSchedule } from "../models/actions/scheduleActions";
import { token } from "../models/selectors/loginSelectors";
import Day from "./Day";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const Calendar = ({
  cars,
  currentSchedule,
  open,
  allDatesFirstRow,
  allDatesSecondRow,
  fetchCurrentSchedule,
}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(token);

  const handleDrop = async (car, day, item) => {
    const currentScheduleId = currentSchedule?.scheduleId;

    try {
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
      }

      await fetchCurrentSchedule();
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <div className={`main-content ${open ? "open" : ""}`}>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Box
          className="days-row-container"
          flexBasis="50%"
          display="flex"
          flexDirection="row"
          gap={0.5}
          p={0.5}
        >
          {allDatesFirstRow.map(({ dateToDisplay, accepts }, index) => (
            <Day
              currentSchedule={Object.keys(currentSchedule.days || {})
                .filter((day) => day < 6)
                .reduce(
                  (acc, curr) => ({
                    ...acc,
                    [curr]: currentSchedule.days[curr],
                  }),
                  {}
                )}
              day={index + 1}
              cars={cars}
              dateToDisplay={dateToDisplay}
              accept={accepts}
              onDrop={(car, item) => handleDrop(car, index + 1, item)}
              key={`${dateToDisplay}_${index}`}
            />
          ))}
        </Box>
        <Box
          className="days-row-container"
          flexBasis="50%"
          display="flex"
          flexDirection="row"
          gap={0.5}
          p={0.5}
        >
          {allDatesSecondRow.map(({ dateToDisplay, accepts }, index) => (
            <Day
              currentSchedule={Object.keys(currentSchedule.days || {})
                .filter((day) => day >= 6)
                .reduce(
                  (acc, curr) => ({
                    ...acc,
                    [curr]: currentSchedule.days[curr],
                  }),
                  {}
                )}
              day={index + 6}
              cars={cars}
              dateToDisplay={dateToDisplay}
              accept={accepts}
              onDrop={(car, item) => handleDrop(car, index + 6, item)}
              key={`${dateToDisplay}_${index + 6}`}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
