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
}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(token);
  const saveDraggableItem = async (scheduleId, day, item) => {
    const resp = await fetch(
      `${import.meta.env.VITE_API_URL}/api/schedules/current/addItem`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "POST",
        body: JSON.stringify({ scheduleId, day, item }),
      }
    );

    const res = await resp.json();

    return res;
  };

  const handleDrop = (car, day, item) => {
    const currentScheduleId = currentSchedule?.scheduleId;
    console.log("Schedule id=", currentScheduleId);
    console.log("Item to be dropped=", item);
    console.log("Day accepting the item=", day);
    console.log("Car accepting the item=", car);
    // try {
    //   const resp = saveDraggableItem(currentScheduleId, day, item);
    // } catch (error) {
    //   enqueueSnackbar(error, { variant: "error" });
    // }

    const updatedSchedule = {
      ...currentSchedule,
      days: {
        ...currentSchedule.days,
        [day]: {
          ...currentSchedule?.days?.[day],
          cars: {
            ...currentSchedule?.days?.[day]?.cars,
            [car]: {
              ...currentSchedule?.days?.[day]?.cars?.[car],
              drivers:
                item?.draggableCategory !== 1
                  ? currentSchedule?.days?.[day]?.cars?.[car]?.drivers?.length
                    ? [...currentSchedule?.days?.[day]?.cars?.[car]?.drivers]
                    : []
                  : currentSchedule?.days?.[day]?.cars?.[car]?.drivers?.filter(
                      (dr) => dr.id === item.id
                    )?.length > 0
                  ? currentSchedule?.days?.[day]?.cars?.[car]?.drivers?.length
                    ? [...currentSchedule?.days?.[day]?.cars?.[car]?.drivers]
                    : []
                  : [
                      ...currentSchedule?.days?.[day]?.cars?.[car]?.drivers,
                      {
                        id: item?.id,
                        name: item?.name,
                        isActive: 1,
                        draggable_category_id: item.draggableCategory,
                      },
                    ],
              regions: [],
              // item?.draggableCategory !== 2
              //   ? [...currentSchedule?.days?.[day]?.cars?.[car]?.regions]
              //   : currentSchedule?.days?.[day]?.cars?.[car]?.regions?.filter(
              //       (dr) => dr.id === item.id
              //     )?.length > 0
              //   ? [...currentSchedule?.days?.[day]?.cars?.[car]?.regions]
              //   : [
              //       ...currentSchedule?.days?.[day]?.cars?.[car]?.regions,
              //       {
              //         id: item?.id,
              //         name: item?.name,
              //         isActive: 1,
              //         draggable_category_id: item.draggableCategory,
              //       },
              //     ],
            },
          },
        },
      },
    };

    console.log(updatedSchedule);
    dispatch(setCurrentSchedule(updatedSchedule));
    // setDroppedBoxNames([...droppedBoxNames, item.name]);
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
