import React from "react";
import { allDraggables } from "../models/selectors/scheduleSelectors";
import { useSelector } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import { generateDates } from "../utils/generateDates";

const DayForDownload = ({ dates, scheduleById, cars }) => {
  console.log(scheduleById);
  const draggables = useSelector(allDraggables);

  return [
    ...generateDates(new Date(dates?.startDate1), draggables),
    ...generateDates(new Date(dates?.startDate2), draggables),
  ]?.map(({ dateToDisplay }, index) => {
    const stylableDay = dateToDisplay?.split(" ");
    return (
      <Box className="day for-download" p={1} display="flex">
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
          {cars?.map((car) => (
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
                {/* list items go here! */}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  });
};

export default DayForDownload;
