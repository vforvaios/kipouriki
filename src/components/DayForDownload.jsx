import React from "react";
import { allCars, allDraggables } from "../models/selectors/scheduleSelectors";
import { useSelector } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import { generateDates } from "../utils/generateDates";
import { regionCategories } from "../constants";

const DayForDownload = ({ dates, scheduleById }) => {
  const cars = useSelector(allCars);
  const draggables = useSelector(allDraggables);

  return [
    ...generateDates(new Date(dates?.startDate1), draggables),
    ...generateDates(new Date(dates?.startDate2), draggables),
  ]?.map(({ dateToDisplay }, index) => {
    const stylableDay = dateToDisplay?.split(" ");
    return (
      <Box
        key={`schedule-for-download-${index}`}
        className="day for-download"
        p={1}
        display="flex"
      >
        <div className="day-of-the-week">
          <strong className="day-text">{stylableDay?.[0]}</strong>
          <strong className="day-number">{stylableDay?.[1]}</strong>
        </div>
        <Box
          display="flex"
          flexGrow={1}
          justifyContent="stretch"
          alignItems="stretch"
          className="tiles-container"
        >
          {cars?.map((car, index2) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                className="tile"
                key={car.id}
                flexBasis={`calc(100% / ${cars.length})`}
                width={`calc(100% / ${cars.length})`}
              >
                <Tooltip title={car.name}>
                  <Typography className="car-text">{car.name}</Typography>
                </Tooltip>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="column"
                  className="container-with-dragged-items"
                >
                  {/* DRIVERS */}
                  <ul className={`droppable-container list drivers-list`}>
                    {scheduleById?.days?.[index + 1]?.cars?.[
                      index2 + 1
                    ]?.drivers?.map((itm) => (
                      <li key={itm.id}>
                        <Tooltip placement="top" title={itm.name}>
                          <Typography>
                            <span>{itm.name}</span>
                          </Typography>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>

                  {/* REGIONS */}
                  <ul className={`droppable-container list regions-list`}>
                    {scheduleById?.days?.[index + 1]?.cars?.[
                      index2 + 1
                    ]?.regions?.map((itm) => (
                      <li key={itm.id}>
                        <Tooltip placement="top" title={itm.name}>
                          <Typography
                            className={`${regionCategories?.[itm?.region_category]} ${
                              itm?.draggable_category_id === 2 && !itm.isDone
                                ? "not-done"
                                : ""
                            }`}
                          >
                            <span>{itm.name}</span>
                          </Typography>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          style={{ minHeight: "20px" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* REGIONS */}
          <ul className={`droppable-container list drivers-list absences`}>
            {scheduleById?.days?.[index + 1]?.cars?.[99]?.drivers?.map(
              (itm) => (
                <li key={itm.id}>
                  <Tooltip placement="top" title={itm.name}>
                    <Typography
                      className={`${regionCategories?.[itm?.region_category]} ${
                        itm?.draggable_category_id === 2 && !itm.isDone
                          ? "not-done"
                          : ""
                      }`}
                    >
                      <span>{itm.name}</span>
                    </Typography>
                  </Tooltip>
                </li>
              )
            )}
          </ul>
        </Box>
      </Box>
    );
  });
};

export default DayForDownload;
